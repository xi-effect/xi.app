'use client';

import { useMainSt } from 'store/main';

import { SignIn } from 'pkg.form.signin';
import React from 'react';

export default function SignInPage() {
  const onSignIn = useMainSt((state) => state.onSignIn);

  return (
    <div className="flex flex-wrap flex-col justify-center content-center w-screen h-[100dvh] xs:h-screen p-1">
      <div className="flex max-w-[420px] w-full h-[600px] xs:border xs:border-gray-10 xs:rounded-2xl p-8">
        <SignIn onSignIn={onSignIn} />
      </div>
    </div>
  );
}
