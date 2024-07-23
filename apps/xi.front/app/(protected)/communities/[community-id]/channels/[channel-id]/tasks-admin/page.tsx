'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TasksAdmin = dynamic(() => import('pkg.module.tasks-admin').then((mod) => mod.TasksAdmin));

export default function TasksAdminPage() {
  return <TasksAdmin />;
}
