import { NewPassword } from 'pkg.form.new-password';

export default function ResetPasswordId() {
  return (
    <div className="flex flex-wrap flex-col justify-center content-center w-screen h-[100dvh] xs:h-screen p-1">
      <div className="flex max-w-[420px] w-full h-[520px] xs:border xs:border-gray-10 xs:rounded-2xl p-8">
        <NewPassword />
      </div>
    </div>
  );
}
