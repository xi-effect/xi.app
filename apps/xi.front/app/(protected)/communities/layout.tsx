'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const Navigation = dynamic(() => import('pkg.navigation').then((mod) => mod.Navigation));

export default function CommunityLayout({ children }: { children: ReactNode }) {
  return <Navigation>{children}</Navigation>;
}
