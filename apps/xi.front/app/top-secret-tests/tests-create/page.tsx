'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TasksCreate = dynamic(() => import('pkg.module.tasks-admin').then((mod) => mod.TasksCreate), {
  ssr: false,
});

export default function FormPage() {
  return <TasksCreate />;
}
