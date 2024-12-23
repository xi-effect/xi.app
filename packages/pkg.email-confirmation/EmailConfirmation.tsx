'use client';

import { Button } from '@xipkg/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { postEmailConfirm } from 'pkg.api';
import { useEffect, useState } from 'react';

export const EmailConfirmation = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // @ts-expect-error TODO поправить типизацию
        const { status } = await postEmailConfirm(params.id[0]);
        if (status !== 201) {
          setHasError(true);
        }
      } catch (e) {
        console.log('error', e);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    confirmEmail();

    return () => {};
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (hasError) {
    return (
      <div className="xs:p-8 flex max-w-[400px] flex-col items-center gap-4 p-0 text-center">
        <h2 className="text-xl-base font-semibold">Ссылка не действительна</h2>
        <p className="text-gray-80 text-m-base font-medium">
          Попробуйте снова или обратитесь в поддержку
        </p>
      </div>
    );
  }

  return (
    <div className="xs:w-auto flex w-full flex-col items-center gap-6">
      <h2 className="text-xl-base font-semibold">Почта подтверждена</h2>
      <Link href="/" passHref className="xs:w-auto w-full">
        <Button className="xs:w-auto w-full px-8 text-xl">Продолжить</Button>
      </Link>
    </div>
  );
};
