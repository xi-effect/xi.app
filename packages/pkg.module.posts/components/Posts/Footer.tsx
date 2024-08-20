import React, { MouseEventHandler } from 'react';
import { Button } from '@xipkg/button';
import { useRouter } from 'next/navigation';

type FooterPropsT = {
  children?: React.ReactNode;
  submitButtonText: string;
  submitButtonHandler: MouseEventHandler<HTMLButtonElement>;
};

export const Footer = ({ children, submitButtonText, submitButtonHandler }: FooterPropsT) => {
  const router = useRouter();
  const handleCancel = () => router.back();

  return (
    <footer className="flex w-full flex-col items-center justify-end gap-4 pt-4 md:flex-row">
      {children && <div className="flex w-full items-start justify-start">{children}</div>}
      <div className="flex w-full flex-row justify-end gap-4 md:w-auto">
        <Button variant="ghost" onClick={handleCancel}>
          Отменить
        </Button>
        <Button onClick={submitButtonHandler}>{submitButtonText}</Button>
      </div>
    </footer>
  );
};
