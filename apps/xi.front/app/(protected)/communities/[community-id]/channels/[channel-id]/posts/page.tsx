'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Posts = dynamic(() => import('pkg.module.announces').then((mod) => mod.Announces));

export default function AnnouncesPage() {
  return <Posts />;
}
