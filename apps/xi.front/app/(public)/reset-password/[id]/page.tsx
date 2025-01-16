import { NewPassword } from 'pkg.form.new-password';
import { use } from 'react';

export default function ResetPasswordId({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const decodedToken = decodeURIComponent(id);
  return (
    <div className="flex flex-wrap flex-col justify-center content-center w-screen h-[100dvh] xs:h-screen p-1">
      <div className="flex max-w-[420px] w-full h-[520px] xs:border xs:border-gray-10 xs:rounded-2xl p-8">
        <NewPassword token={decodedToken} />
      </div>
    </div>
  );
}
