'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ScrollArea } from '@xipkg/scrollarea';

const Posts = dynamic(() => import('pkg.module.posts').then((mod) => mod.Announces));

export default function AnnouncesPage() {
  return (
    <ScrollArea>
      <div className="flex flex-col h-[calc(100dvh-80px)] md:h-screen p-8 max-xs:p-4">
        <Posts />
      </div>
    </ScrollArea>
  );
}
