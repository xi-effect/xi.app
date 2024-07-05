import React from 'react';
import { Button } from '@xipkg/button/Button';

type ItemPropsT = {
  buttonText: string;
};

export const ConfirmEmail = ({ buttonText }: ItemPropsT) => (
  <div className="bg-red-0 flex w-full flex-row justify-between rounded-2xl text-red-100">
    <div className="flex flex-col p-4 md:max-w-lg">
      <span className="mb-1 text-sm font-semibold">Почта не подтверждена</span>
      <span className="mb-4 text-xs font-normal">
        Подтверждение адреса электронной почты требуется для&nbsp;защиты аккаунта
        и&nbsp;восстановления доступа
      </span>
      <span className="mb-1 text-xs font-normal">Письмо не пришло?</span>
      <Button variant="secondary-error" size="s" className="w-fit">
        {buttonText}
      </Button>
    </div>
    <div className="mr-4 hidden items-end sm:flex md:mr-9">
      <svg
        className="h-[78px] w-[128px] md:h-[130px] md:w-[214px]"
        fill="none"
        viewBox="0 0 214 130"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M160.333.667H53.667C24.212.667.333 24.545.333 54v64c0 29.455 23.879 53.333 53.334 53.333h106.666c29.456 0 53.334-23.878 53.334-53.333V54c0-29.455-23.878-53.333-53.334-53.333zM30.895 31.517C36.697 25.642 44.758 22 53.667 22h106.666c8.91 0 16.97 3.642 22.772 9.517L107 73.797l-76.105-42.28zm-9.078 19.361a32.37 32.37 0 0 0-.15 3.122v64c0 17.673 14.327 32 32 32h106.666c17.674 0 32-14.327 32-32V54c0-1.053-.05-2.094-.15-3.122L114.77 93.885a16 16 0 0 1-15.54 0L21.817 50.878z"
          fill="#F19E9E"
        />
      </svg>
    </div>
  </div>
);
