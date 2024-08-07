import { SignIn } from 'pkg.form.signin';
import React from 'react';

export default function ConfirmEmail() {
  return (
    <div className="flex flex-wrap flex-col justify-center content-center w-screen h-[100dvh] xs:h-screen p-1">
      <div className="flex max-w-[420px] w-full h-[520px] xs:border xs:border-gray-10 rounded-2xl p-8">
        <SignIn />
      </div>
    </div>
  );
}
