'use client';

import { NewPassword } from 'pkg.form.reset-password';

export default function ResetPasswordId() {
  return (
    <div className="flex flex-wrap flex-col justify-center content-center w-screen h-screen p-1">
      <div className="flex max-w-[420px] w-full h-[520px] border border-gray-10 rounded-2xl p-8">
        <NewPassword onNewPassword={() => {}} />
      </div>
    </div>
  );
}
