'use client';

import { ReactNode } from 'react';
import { CommunityMenu } from './components';

type NavigationProp = {
  logo: ReactNode;
  children: ReactNode;
};

export const Navigation = ({ logo, children }: NavigationProp) => {
  console.log('Navigation');
  return (
    <div className="flex flex-row">
      <div className="flex flex-col flex-wrap p-6 h-screen min-w-[350px]">
        <div className="flex flex-wrap w-full h-8 p-2"> {logo} </div>
        <CommunityMenu />
      </div>
      {children}
    </div>
  );
};
