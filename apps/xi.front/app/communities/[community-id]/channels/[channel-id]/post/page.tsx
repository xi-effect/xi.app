'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Announce = dynamic(() =>
  import('pkg.module.announces/components/AnnouncePost').then((mod) => mod.default),
);

export default function AnnouncePostPage({ params }: { params: { vid: string } }) {
  console.log('params', params);

  return (
    <Announce
      postTitle="Победа на чемпионате"
      postText={undefined}
      date="4 мая 2022"
      author="Юшкевич О.А."
    />
  );
}
