'use client';
import { PasswordRecovery } from 'pkg.password-recovery.form';
import React from 'react';

export default function PasswordRecoveryPage() {
  return (
    <div className="flex flex-wrap flex-col justify-center content-center w-screen h-screen p-1">
      <div className="flex max-w-[420px] w-full h-[520px] border border-gray-10 rounded-2xl p-8">
        <PasswordRecovery />
      </div>
    </div>
  );
}
