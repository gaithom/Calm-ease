# Generates real audio files for CalmEase using Windows PowerShell.
# - voice-guided.wav: synthesized voice guidance (calm breathing + affirmations)
# - soft-piano.wav: simple soft piano-like chord (C major) as a soothing background loop

$ErrorActionPreference = 'Stop'

# Resolve project paths
$projRoot = Split-Path $PSScriptRoot -Parent
$sounds = Join-Path $projRoot 'public\sounds'
New-Item -ItemType Directory -Path $sounds -Force | Out-Null

# 1) Generate voice-guided.wav using System.Speech TTS (offline)
try {
  Add-Type -AssemblyName System.Speech
  $voicePath = Join-Path $sounds 'voice-guided.wav'
  $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
  $synth.Rate = -1
  $synth.Volume = 100
  try { $synth.SelectVoiceByHints([System.Speech.Synthesis.VoiceGender]::Female) } catch {}

  $text = @'
Welcome to Calm Ease. You are safe. Let’s slow everything down together.

We’ll do three gentle breaths.

Breathe in through your nose for four… one, two, three, four.
Hold for four… one, two, three, four.
Exhale slowly for six… one, two, three, four, five, six.

Again. In for four… one, two, three, four.
Hold for four… one, two, three, four.
Exhale for six… one, two, three, four, five, six.

One more time. In for four… one, two, three, four.
Hold… one, two, three, four.
Exhale… one, two, three, four, five, six.

Now say to yourself: “This feeling will pass. I can handle this. I am safe.”

Good. When you’re ready, look around and name a few things you can see.
You’re doing great.
'@

  $synth.SetOutputToWaveFile($voicePath)
  $synth.Speak($text)
  $synth.Dispose()
  Write-Host "Created $voicePath"
} catch {
  Write-Warning "Failed to create voice-guided.wav: $_"
}

# 2) Generate soft-piano.wav: calm arpeggios with piano-like harmonics and ADSR
try {
  Write-Host "Generating soft piano..."
  $pianoPath = Join-Path $sounds 'soft-piano.wav'
  $sampleRate = 22050
  $durationSec = 30
  $channels = 1
  $bits = 16
  $totalSamples = [int]($sampleRate * $durationSec)

  # Accumulate into a float buffer then write to WAV
  $buf = New-Object double[] $totalSamples

  function Add-Note([double]$startSec, [double]$noteSec, [double]$freq, [double]$amp) {
    $sr = $sampleRate
    $start = [int]($startSec * $sr)
    $nSamp = [int]($noteSec * $sr)
    if ($start -lt 0) { $start = 0 }
    $end = [Math]::Min($totalSamples, $start + $nSamp)

    # Piano-like ADSR
    $A = 0.005; $D = 0.20; $S = 0.30; $R = 0.30
    if ($noteSec -gt ($A + $D + $R)) { $sustainDur = $noteSec - ($A + $D + $R) } else { $sustainDur = 0 }

    # Gentle chorus detune in cents
    $cents = 3.0
    $det1 = [Math]::Pow(2.0, $cents/1200.0)
    $det2 = [Math]::Pow(2.0, -$cents/1200.0)

    for ($i = $start; $i -lt $end; $i++) {
      $t = ($i - $start) / $sr

      # Envelope
      if ($t -lt $A) { $env = $t / $A }
      elseif ($t -lt ($A + $D)) {
        $env = 1.0 - (($t - $A) / $D) * (1.0 - $S)
      }
      elseif ($t -lt ($A + $D + $sustainDur)) {
        $env = $S
      }
      else {
        $tr = $t - ($A + $D + $sustainDur)
        $env = [Math]::Max(0.0, $S * (1.0 - ($tr / $R)))
      }

      # Harmonics with decay across overtones
      $val = 0.0
      $harmAmps = @(1.00, 0.60, 0.40, 0.25, 0.15)
      for ($k=1; $k -le $harmAmps.Count; $k++) {
        $ha = $harmAmps[$k-1]
        $base = 2 * [Math]::PI * ($freq * $k) * $t
        $val += $ha * [Math]::Sin($base)
        $val += 0.7 * $ha * [Math]::Sin(2 * [Math]::PI * ($freq * $k * $det1) * $t)
        $val += 0.7 * $ha * [Math]::Sin(2 * [Math]::PI * ($freq * $k * $det2) * $t)
      }
      # Normalize harmonic sum roughly
      $val = $val / 2.4

      $buf[$i] += $val * $env * $amp
    }
  }

  # Simple calm chord progression with arpeggios: C, Am, F, G
  $chords = @(
    @(261.63, 329.63, 392.00, 523.25),   # C major (add C5)
    @(220.00, 261.63, 329.63, 440.00),   # A minor
    @(174.61, 220.00, 261.63, 349.23),   # F major
    @(196.00, 246.94, 293.66, 392.00)    # G major
  )

  $time = 0.0
  while ($time -lt $durationSec) {
    foreach ($ch in $chords) {
      # Slow, soothing arpeggio through the chord tones with slight humanization
      foreach ($f in $ch) {
        $noteLen = 2.6 + (Get-Random -Minimum -0.25 -Maximum 0.25)
        $amp = 0.18 + (Get-Random -Minimum -0.02 -Maximum 0.02)
        Add-Note -startSec $time -noteSec $noteLen -freq $f -amp $amp
        $time += 1.35 # slower spacing for calm pacing
        if ($time -ge $durationSec) { break }
      }
      if ($time -ge $durationSec) { break }
      # Add a very soft chord pad underneath for warmth
      $padLen = 4.0
      $padAmp = 0.05
      foreach ($f in $ch) { Add-Note -startSec ($time - 2.0) -noteSec $padLen -freq $f -amp $padAmp }
    }
  }

  # Add gentle echo tail
  $delay1 = [int](0.45 * $sampleRate)
  $delay2 = [int](0.90 * $sampleRate)
  for ($i=$delay1; $i -lt $totalSamples; $i++) { $buf[$i] += 0.18 * $buf[$i - $delay1] }
  for ($i=$delay2; $i -lt $totalSamples; $i++) { $buf[$i] += 0.10 * $buf[$i - $delay2] }

  # Normalize to avoid clipping
  $max = 0.0
  for ($i=0; $i -lt $totalSamples; $i++) { $a = [Math]::Abs($buf[$i]); if ($a -gt $max) { $max = $a } }
  if ($max -gt 0.99) { $scale = 0.99 / $max } else { $scale = 1.0 }

  # Write WAV
  $ms = New-Object System.IO.MemoryStream
  $bw = New-Object System.IO.BinaryWriter($ms)
  function Write-ASCII([string]$str) { $bw.Write([System.Text.Encoding]::ASCII.GetBytes($str)) }
  function W32($v) { $bw.Write([UInt32]$v) }
  function W16($v) { $bw.Write([UInt16]$v) }
  function I16($v) { $bw.Write([Int16]$v) }

  Write-ASCII 'RIFF'; W32 0; Write-ASCII 'WAVE'
  Write-ASCII 'fmt '; W32 16; W16 1; W16 $channels
  W32 $sampleRate
  $byteRate = $sampleRate * $channels * ($bits/8)
  W32 $byteRate
  $blockAlign = $channels * ($bits/8)
  W16 $blockAlign
  W16 $bits
  Write-ASCII 'data'; W32 0

  for ($i=0; $i -lt $totalSamples; $i++) {
    $s = $buf[$i] * $scale
    if ($s -gt 1.0) { $s = 1.0 }
    if ($s -lt -1.0) { $s = -1.0 }
    I16 ([int]([Math]::Round($s * 32767)))
  }

  $null = $bw.BaseStream.Seek(4, [System.IO.SeekOrigin]::Begin); W32 ($ms.Length - 8)
  $null = $bw.BaseStream.Seek(40, [System.IO.SeekOrigin]::Begin); W32 ($ms.Length - 44)
  $bw.Flush()
  [System.IO.File]::WriteAllBytes($pianoPath, $ms.ToArray())
  $bw.Close(); $ms.Close()
  Write-Host "Created $pianoPath"
} catch {
  Write-Warning "Failed to create soft-piano.wav: $_"
}

# 3) Generate ocean.wav: slow-breathing ocean-like noise with swells
try {
  $oceanPath = Join-Path $sounds 'ocean.wav'
  $sampleRate = 44100
  $durationSec = 30
  $channels = 1
  $bits = 16
  $totalSamples = [int]($sampleRate * $durationSec)

  $ms = New-Object System.IO.MemoryStream
  $bw = New-Object System.IO.BinaryWriter($ms)
  function Write-ASCII2([string]$str) { $bw.Write([System.Text.Encoding]::ASCII.GetBytes($str)) }
  function W32_2($v) { $bw.Write([UInt32]$v) }
  function W16_2($v) { $bw.Write([UInt16]$v) }
  function I16_2($v) { $bw.Write([Int16]$v) }

  Write-ASCII2 'RIFF'; W32_2 0; Write-ASCII2 'WAVE'
  Write-ASCII2 'fmt '; W32_2 16; W16_2 1; W16_2 $channels
  W32_2 $sampleRate
  $byteRate = $sampleRate * $channels * ($bits/8)
  W32_2 $byteRate
  $blockAlign = $channels * ($bits/8)
  W16_2 $blockAlign
  W16_2 $bits
  Write-ASCII2 'data'; W32_2 0

  $prevLow = 0.0; $alphaLow = 0.01 # deep swell
  $prevMid = 0.0; $alphaMid = 0.05 # foam
  $prevHi  = 0.0; $alphaHi  = 0.25 # spray
  for ($i=0; $i -lt $totalSamples; $i++) {
    $t = $i / $sampleRate
    $x = (Get-Random -Minimum -1.0 -Maximum 1.0)

    $low = $alphaLow * $x + (1.0 - $alphaLow) * $prevLow; $prevLow = $low
    $mid = $alphaMid * $x + (1.0 - $alphaMid) * $prevMid; $prevMid = $mid
    $hi  = $alphaHi  * $x + (1.0 - $alphaHi ) * $prevHi;  $prevHi  = $hi

    # slow swell ~0.08 Hz
    $swell = 0.55 + 0.45 * [Math]::Sin(2 * [Math]::PI * 0.08 * $t + 1.2)
    $val = 0.6 * $low * $swell + 0.3 * $mid + 0.1 * $hi

    $sample = [int]([Math]::Round([Math]::Max(-1.0, [Math]::Min(1.0, $val)) * 32767))
    I16_2 $sample
  }

  $null = $bw.BaseStream.Seek(4, [System.IO.SeekOrigin]::Begin); W32_2 ($ms.Length - 8)
  $null = $bw.BaseStream.Seek(40, [System.IO.SeekOrigin]::Begin); W32_2 ($ms.Length - 44)
  $bw.Flush(); [System.IO.File]::WriteAllBytes($oceanPath, $ms.ToArray())
  $bw.Close(); $ms.Close()
  Write-Host "Created $oceanPath"
} catch {
  Write-Warning "Failed to create ocean.wav: $_"
}

# 4) Generate rain.wav: gentle rain with drops and hiss
try {
  $rainPath = Join-Path $sounds 'rain.wav'
  $sampleRate = 44100
  $durationSec = 40
  $channels = 1
  $bits = 16
  $totalSamples = [int]($sampleRate * $durationSec)

  $ms = New-Object System.IO.MemoryStream
  $bw = New-Object System.IO.BinaryWriter($ms)
  function Write-ASCII3([string]$str) { $bw.Write([System.Text.Encoding]::ASCII.GetBytes($str)) }
  function W32_3($v) { $bw.Write([UInt32]$v) }
  function W16_3($v) { $bw.Write([UInt16]$v) }
  function I16_3($v) { $bw.Write([Int16]$v) }

  Write-ASCII3 'RIFF'; W32_3 0; Write-ASCII3 'WAVE'
  Write-ASCII3 'fmt '; W32_3 16; W16_3 1; W16_3 $channels
  W32_3 $sampleRate
  $byteRate = $sampleRate * $channels * ($bits/8)
  W32_3 $byteRate
  $blockAlign = $channels * ($bits/8)
  W16_3 $blockAlign
  W16_3 $bits
  Write-ASCII3 'data'; W32_3 0

  $prev = 0.0
  $alpha = 0.35 # brighter hiss

  # Prepare some random droplet times
  $drops = @{}
  for ($d=0; $d -lt 140; $d++) { $drops[[int](Get-Random -Minimum 0 -Maximum $totalSamples)] = 1 }

  for ($i=0; $i -lt $totalSamples; $i++) {
    # hiss component (high-freq noise)
    $x = (Get-Random -Minimum -1.0 -Maximum 1.0)
    $y = $alpha * $x + (1.0 - $alpha) * $prev
    $prev = $y

    # droplet: short exponential decay sine burst
    $drop = 0.0
    if ($drops.ContainsKey($i)) {
      $len = [int]($sampleRate * (Get-Random -Minimum 0.05 -Maximum 0.12))
      $freq = Get-Random -Minimum 1200 -Maximum 2600
      for ($k=0; $k -lt $len -and ($i+$k) -lt $totalSamples; $k++) {
        $tt = $k / $sampleRate
        $env = [Math]::Exp(-28 * $tt)
        $drop += 0.12 * [Math]::Sin(2 * [Math]::PI * $freq * $tt) * $env
      }
    }

    $val = 0.28 * $y + $drop
    $sample = [int]([Math]::Round([Math]::Max(-1.0, [Math]::Min(1.0, $val)) * 32767))
    I16_3 $sample
  }

  $null = $bw.BaseStream.Seek(4, [System.IO.SeekOrigin]::Begin); W32_3 ($ms.Length - 8)
  $null = $bw.BaseStream.Seek(40, [System.IO.SeekOrigin]::Begin); W32_3 ($ms.Length - 44)
  $bw.Flush(); [System.IO.File]::WriteAllBytes($rainPath, $ms.ToArray())
  $bw.Close(); $ms.Close()
  Write-Host "Created $rainPath"
} catch {
  Write-Warning "Failed to create rain.wav: $_"
}

# 5) Generate forest.wav: wind + occasional bird chirps
try {
  $forestPath = Join-Path $sounds 'forest.wav'
  $sampleRate = 44100
  $durationSec = 40
  $channels = 1
  $bits = 16
  $totalSamples = [int]($sampleRate * $durationSec)

  $ms = New-Object System.IO.MemoryStream
  $bw = New-Object System.IO.BinaryWriter($ms)
  function Write-ASCII4([string]$str) { $bw.Write([System.Text.Encoding]::ASCII.GetBytes($str)) }
  function W32_4($v) { $bw.Write([UInt32]$v) }
  function W16_4($v) { $bw.Write([UInt16]$v) }
  function I16_4($v) { $bw.Write([Int16]$v) }

  Write-ASCII4 'RIFF'; W32_4 0; Write-ASCII4 'WAVE'
  Write-ASCII4 'fmt '; W32_4 16; W16_4 1; W16_4 $channels
  W32_4 $sampleRate
  $byteRate = $sampleRate * $channels * ($bits/8)
  W32_4 $byteRate
  $blockAlign = $channels * ($bits/8)
  W16_4 $blockAlign
  W16_4 $bits
  Write-ASCII4 'data'; W32_4 0

  # wind: very low-passed noise
  $prev = 0.0
  $alpha = 0.008

  # plan random bird chirps (frequency sweeps)
  $chirps = @{}
  for ($c=0; $c -lt 10; $c++) { $chirps[[int](Get-Random -Minimum 0 -Maximum ($totalSamples-3000))] = 1 }

  for ($i=0; $i -lt $totalSamples; $i++) {
    $x = (Get-Random -Minimum -1.0 -Maximum 1.0)
    $y = $alpha * $x + (1.0 - $alpha) * $prev
    $prev = $y

    $val = 0.25 * $y

    if ($chirps.ContainsKey($i)) {
      $len = [int]($sampleRate * 0.35)
      for ($k=0; $k -lt $len -and ($i+$k) -lt $totalSamples; $k++) {
        $tt = $k / $sampleRate
        $f0 = Get-Random -Minimum 1400 -Maximum 2000
        $f1 = $f0 + (Get-Random -Minimum 400 -Maximum 900)
        $f = $f0 + ($f1 - $f0) * ($tt / ($len / $sampleRate))
        $env = [Math]::Exp(-5 * $tt)
        $s = [Math]::Sin(2 * [Math]::PI * $f * $tt) * $env * 0.12
        $val += $s
      }
    }

    $sample = [int]([Math]::Round([Math]::Max(-1.0, [Math]::Min(1.0, $val)) * 32767))
    I16_4 $sample
  }

  $null = $bw.BaseStream.Seek(4, [System.IO.SeekOrigin]::Begin); W32_4 ($ms.Length - 8)
  $null = $bw.BaseStream.Seek(40, [System.IO.SeekOrigin]::Begin); W32_4 ($ms.Length - 44)
  $bw.Flush(); [System.IO.File]::WriteAllBytes($forestPath, $ms.ToArray())
  $bw.Close(); $ms.Close()
  Write-Host "Created $forestPath"
} catch {
  Write-Warning "Failed to create forest.wav: $_"
}
