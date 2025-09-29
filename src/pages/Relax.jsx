import React from 'react';
import RelaxationPlayer from '../components/RelaxationPlayer';
import BackgroundSound from '../components/BackgroundSound';

export default function Relax() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <RelaxationPlayer />
      <BackgroundSound />
    </div>
  );
}
