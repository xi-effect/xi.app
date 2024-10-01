'use client';

import { Button } from '@xipkg/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { post } from 'pkg.utils';
import { useEffect, useState } from 'react';

export const EmailConfirmation = () => {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const confirmEmail = async (token: string | string[]) => {
      try {
        const decodedToken = decodeURIComponent(token as string);

        const { status } = await post({
          service: 'auth',
          path: '/api/email-confirmation/confirmations/',
          body: { token: decodedToken },
          config: {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        });

        if (status !== 204) {
          setHasError(true);
        }
      } catch (e) {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      confirmEmail(params.id);
    }
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return hasError ? (
    <div className="xs:p-8 flex max-w-[400px] flex-col items-center gap-4 p-0 text-center">
      <h2 className="text-xl-base font-semibold">Ссылка не действительна</h2>
      <p className="text-gray-80 text-m-base font-medium">
        Попробуйте снова или обратитесь в поддержку
      </p>
    </div>
  ) : (
    <div className="xs:w-auto flex w-full flex-col items-center gap-6">
      <h2 className="text-xl-base font-semibold">Почта подтверждена</h2>
      <Link href="/" passHref className="xs:w-auto w-full">
        <Button className="xs:w-auto w-full px-8">
          <span className="text-l-base">Продолжить</span>
        </Button>
      </Link>
    </div>
  );
};
