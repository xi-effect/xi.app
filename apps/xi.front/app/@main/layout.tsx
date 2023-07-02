'use client';

import Image from 'next/image';

import { Navigation } from 'pkg.navigation';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row w-full h-screen">
      <Navigation
        logo={<Image src="./full-logo-xieffect.svg" alt="xieffect logo" width={134} height={16} />}
      />
      {children}
    </div>
  );
}
