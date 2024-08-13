import React, { MouseEventHandler } from 'react';
import { Button } from '@xipkg/button';
import { useRouter } from 'next/navigation';

type FooterPropsT = {
    children?: React.ReactNode;
    submitButtonText: string;
    submitButtonHandler: MouseEventHandler<HTMLButtonElement>;
};

export const Footer = ({ children, submitButtonText, submitButtonHandler } : FooterPropsT) => {
    const router = useRouter();
    const handleCancel = () => router.back();

    return (
      <footer className="w-full flex flex-col md:flex-row justify-end items-center gap-4 pt-4">
        {children && <div className="w-full flex justify-start items-start">{children}</div>}
        <div className="flex flex-row gap-4 justify-end w-full md:w-auto">
          <Button variant="ghost" onClick={handleCancel}>Отменить</Button>
          <Button onClick={submitButtonHandler}>{submitButtonText}</Button>
        </div>
      </footer>
    );
};
