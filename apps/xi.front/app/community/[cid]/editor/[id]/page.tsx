'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('pkg.module.editor').then((mod) => mod.Editor));

export default function EditorPage({ params }: { params: { vid: string } }) {
  console.log('params', params);

  return (
    <div className="w-full md:w-[calc(100vw-350px)] md:min-h-screen md:h-screen md:overflow-auto bg-gray-0">
      <Editor />
    </div>
  );
}
