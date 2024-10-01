import { EmailConfirmation } from 'pkg.email-confirmation';
import { Logo } from 'pkg.logo';
import React from 'react';

export default function ConfirmEmailPage() {
  return (
    <div className="flex flex-wrap flex-col justify-center content-center w-screen h-[100dvh] xs:h-screen p-1">
      <div className="flex flex-col py-12 xl:py-24 h-full px-6 w-full">
        <div className="flex justify-center items-center h-8 p-1">
          <Logo height={16} width={134} logoVariant="navigation" logoSize="default" />
        </div>
        <div className="shrink-0 h-full flex flex-col justify-center items-center">
          <EmailConfirmation />
        </div>
      </div>
    </div>
  );
}
