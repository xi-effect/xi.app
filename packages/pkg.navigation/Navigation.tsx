'use client';

import { ReactNode } from 'react';

type NavigationProp = {
  logo: ReactNode;
  children: ReactNode;
};

export const Navigation = ({ logo, children }: NavigationProp) => {
  console.log('Navigation');
  return (
    <>
      <div className="flex flex-col flex-wrap p-6 h-screen w-[350px]">
        <div className="flex flex-wrap w-full h-8 p-2"> {logo} </div>
        <div className="flex flex-wrap w-full h-12 p-2 mt-8">
          <div className="c-avatar"> МП </div>
          <div className="ml-2 t-m font-semibold self-center"> Мое пространство </div>
        </div>
      </div>
      {children}
    </>
  );
};
