'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { mockValues } from 'pkg.module.editor';

const Editor = dynamic(() => import('pkg.module.editor').then((mod) => mod.Editor));

export default function EditorPage() {
  return (
    <div className="p-4 w-full md:w-[calc(100vw-350px)] md:min-h-screen md:h-screen md:overflow-auto bg-gray-0">
      {/* <Editor initialValue={mockValues} /> */}
      <Editor initialValue={mockValues} />
    </div>
  );
}
