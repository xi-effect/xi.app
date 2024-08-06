'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TasksCreate = dynamic(() => import('pkg.module.tasks-admin').then((mod) => mod.TasksCreate));

export default function FormPage() {
  return <TasksCreate />;
}
