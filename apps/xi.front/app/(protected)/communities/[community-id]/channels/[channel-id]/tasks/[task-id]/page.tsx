'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ScrollArea } from '@xipkg/scrollarea';

const Task = dynamic(() => import('pkg.module.tasks').then((mod) => mod.Task));

export default function TaskPage() {
  return (
    <ScrollArea>
      <div className="flex flex-col h-[calc(100dvh-80px)] md:h-screen p-8 max-xs:p-4">
        <Task />
      </div>
    </ScrollArea>
  );
}
