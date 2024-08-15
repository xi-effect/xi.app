'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ScrollArea } from '@xipkg/scrollarea';

const AddPost = dynamic(() => import('pkg.module.posts').then((mod) => mod.AddPost));

export default function AddPostPage() {
  return (
    <ScrollArea>
      <div className="flex flex-col h-[calc(100dvh-80px)] md:h-screen p-8 max-xs:p-4">
        <AddPost />
      </div>
    </ScrollArea>
  );
}
