'use client';

import { Navigation } from 'pkg.navigation';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row w-full h-screen">
      <Navigation />
      {children}
    </div>
  );
}
