import { ReactNode } from 'react';

type LayoutPropT = {
  header: ReactNode;
  children: ReactNode;
};

export const Layout = ({ header, children }: LayoutPropT) => (
  <div className="relative flex flex-col">
    <header className="fixed p-8">{header}</header>
    <div className="">{children}</div>
  </div>
);
