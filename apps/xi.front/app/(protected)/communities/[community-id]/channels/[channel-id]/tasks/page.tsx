'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Tasks = dynamic(() => import('pkg.module.tasks').then((mod) => mod.Tasks));

export default function TasksPage() {
  return <Tasks />;
}
