'use client';

import { useMainSt } from 'store/main';

import { SignIn } from 'pkg.signin.form';
import React from 'react';

export default function ResetPassword() {
  const onSignIn = useMainSt((state) => state.onSignIn);

  return (
    <div className="flex flex-wrap flex-col xs:justify-center content-center w-screen h-[100dvh] xs:h-screen">
      <div className="flex max-w-[420px] w-full h-full xs:h-[520px] xs:border xs:border-gray-10 xs:rounded-2xl p-6 xs:p-8">
        <SignIn onSignIn={onSignIn} />
      </div>
    </div>
  );
}
