'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Tasks = dynamic(() => import('pkg.module.tasks').then((mod) => mod.Tasks));

export default function TasksPage() {
  return (
    <div className="w-full md:w-[calc(100vw-350px)] md:min-h-screen md:h-screen md:overflow-auto bg-gray-0">
      <Tasks />
    </div>
  );
}
