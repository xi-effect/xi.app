'use client';

import { useMainSt } from 'pkg.stores';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const Navigation = dynamic(() => import('pkg.navigation').then((mod) => mod.Navigation));

export default function CommunityLayout({ children }: { children: ReactNode }) {
  const onSignOut = useMainSt((state) => state.onSignOut);

  return <Navigation onExit={onSignOut}>{children}</Navigation>;
}
