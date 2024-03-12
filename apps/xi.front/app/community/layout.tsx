'use client';

import { useMainSt } from 'pkg.stores';

import dynamic from 'next/dynamic';

const Navigation = dynamic(() => import('pkg.navigation').then((mod) => mod.Navigation));

export default function CommunityLayout({ children }) {
  const onSignOut = useMainSt((state) => state.onSignOut);

  return (
    <Navigation onExit={onSignOut}>
      {children}
    </Navigation>
  );
}
