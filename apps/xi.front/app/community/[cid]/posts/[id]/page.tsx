'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Announces = dynamic(() => import('pkg.module.announces').then((mod) => mod.Announces));

export default function AnnouncesPage({ params }: { params: { vid: string } }) {
  console.log('params', params);

  return <Announces />;
}
