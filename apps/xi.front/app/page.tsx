'use client';

import { useMainSt } from 'store/main';

import { SignIn } from 'pkg.signin.form';
import { Button } from '@xipkg/button';

import React from 'react';

export default function SigninPage() {
  const signIn = useMainSt((state) => state.signIn);
  const onSignIn = useMainSt((state) => state.onSignIn);

  return (
    <div className="flex flex-wrap flex-col justify-center content-center w-screen h-screen p-1">
      <div className="flex max-w-md border border-gray-10 rounded-2xl p-8">
        <SignIn signIn={signIn} onSignIn={onSignIn} />
      </div>
    </div>
  );
}
