'use client';

import { ReactNode } from 'react';

type LayoutProp = {
  header: ReactNode;
  children: ReactNode;
};

export const Layout = ({ header, children }: LayoutProp) => {
  console.log('Layout');
  return (
    <div className="relative flex flex-col">
      <header className="fixed p-8">{header}</header>
      <div className="">{children}</div>
    </div>
  );
};
