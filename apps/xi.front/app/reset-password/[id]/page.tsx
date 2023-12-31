'use client';

import { useMainSt } from 'store/main';

import { SignIn } from 'pkg.form.signin';
import React from 'react';

export default function ResetPasswordId() {
  const onSignIn = useMainSt((state) => state.onSignIn);

  return (
    <div className="flex flex-wrap flex-col justify-center content-center w-screen h-screen p-1">
      <div className="flex max-w-[420px] w-full h-[520px] border border-gray-10 rounded-2xl p-8">
        <SignIn onSignIn={onSignIn} />
      </div>
    </div>
  );
}
