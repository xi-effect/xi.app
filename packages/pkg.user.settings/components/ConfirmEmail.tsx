import React, { useState, useEffect } from 'react';
import { Button } from '@xipkg/button/Button';
import { post } from 'pkg.utils';
import { toast } from 'sonner';
import { useMainSt } from 'pkg.stores';
import { useRouter } from 'next/navigation';
import EmailIcon from './EmailIcon';

const formatTimeDifference = (allowedResendDate: Date, currentDate: Date): string => {
  const timeDifference = allowedResendDate.getTime() - currentDate.getTime();

  const totalMinutes = Math.floor(timeDifference / (1000 * 60));
  const seconds = Math.floor((timeDifference / 1000) % 60);

  return `${String(totalMinutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const ConfirmEmail = () => {
  const router = useRouter();
  const { allowedConfirmationResend } = useMainSt((state) => state.user);
  const updateUser = useMainSt((state) => state.updateUser);
  const allowedResendDate = new Date(allowedConfirmationResend);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isTimeUp, setIsTimeUp] = useState(currentDate >= allowedResendDate);
  const [isButtonActive, setIsButtonActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const newCurrentDate = new Date();
      setCurrentDate(newCurrentDate);

      if (newCurrentDate >= allowedResendDate) {
        setIsTimeUp(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [allowedResendDate, allowedConfirmationResend]);

  const resendConfirmation = async () => {
    setIsButtonActive(false);

    const { status } = await post<{}, {}>({
      service: 'auth',
      path: '/api/email-confirmation/requests/',
    });

    if (status === 204) {
      toast('Письмо для подтверждения было отправлено');
      const newResendTime = new Date();
      newResendTime.setMinutes(newResendTime.getMinutes() + 10);
      updateUser({ allowedConfirmationResend: newResendTime.toISOString() });
      setIsTimeUp(false);
    } else if (status === 429) {
      toast('Письмо было отправленно, повторите попытку позже');
    } else {
      toast('Пожалуйста, войдите в аккаунт');
      router.push('/signin');
    }

    setIsButtonActive(true);
  };

  return (
    <div className="bg-red-0 flex w-full flex-row justify-between rounded-2xl text-red-100">
      <div className="flex flex-col p-4 md:max-w-lg">
        <span className="mb-1 text-sm font-semibold">Почта не подтверждена</span>
        <span className="mb-4 text-xs font-normal">
          Подтверждение адреса электронной почты требуется для&nbsp;защиты аккаунта
          и&nbsp;восстановления доступа
        </span>
        <span className="mb-1 text-xs font-normal">Письмо не пришло?</span>
        {isTimeUp ? (
          <Button
            variant="secondary-error"
            size="s"
            className="w-fit"
            onClick={resendConfirmation}
            disabled={!isButtonActive}
          >
            Оправить повторно
          </Button>
        ) : (
          <Button variant="secondary-error" size="s" className="w-fit" disabled>
            Отправить повторно через {formatTimeDifference(allowedResendDate, currentDate)}
          </Button>
        )}
      </div>
      <EmailIcon />
    </div>
  );
};
