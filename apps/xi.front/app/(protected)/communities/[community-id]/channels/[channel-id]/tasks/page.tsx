'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ScrollArea } from '@xipkg/scrollarea';

const Tasks = dynamic(() => import('pkg.module.tasks').then((mod) => mod.Tasks));

export default function TasksPage() {
  return (
    <ScrollArea>
      <div className="flex flex-col h-[calc(100dvh-80px)] md:h-screen p-8 max-xs:p-4">
        <Tasks />
      </div>
    </ScrollArea>
  );
}
