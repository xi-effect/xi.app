'use client';
import { ResetPassword } from 'pkg.reset-password.form';
import React from 'react';

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-wrap flex-col justify-start xs:justify-center content-center w-screen h-screen p-1">
      <div className="flex max-w-[420px] w-full h-full xs:h-[520px]  border-none xs:border-solid xs:border xs:border-gray-10 rounded-2xl p-6 xs:p-8">
        <ResetPassword />
      </div>
    </div>
  );
}
