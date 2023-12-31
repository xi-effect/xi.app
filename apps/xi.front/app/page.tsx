'use client';

import { SignIn } from 'pkg.form.signin';
import React from 'react';
import { useMainSt } from 'store';

export default function Main() {
  const isLogin = useMainSt((state) => state.isLogin);
  const onSignIn = useMainSt((state) => state.onSignIn);

  console.log('isLogin', isLogin);

  if (isLogin === false)
    return (
      <>
        <div className="flex flex-wrap flex-col xs:justify-center content-center w-screen h-[100dvh] xs:h-screen">
          <div className="flex max-w-[420px] w-full h-full xs:h-[520px] xs:border xs:border-gray-10 xs:rounded-2xl p-6 xs:p-8">
            <SignIn onSignIn={onSignIn} />
          </div>
        </div>
      </>
    );

  return (
    <div className="p-8 w-full md:w-[calc(100vw-350px)] md:min-h-screen md:h-screen md:overflow-auto">
      <h1 className="text-3xl font-bold">Главная</h1>
    </div>
  );
}
