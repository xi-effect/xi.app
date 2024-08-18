'use client';

import { ErrorPage } from 'pkg.error-page';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';

export default function Error500({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <ErrorPage
      title="Сервис недоступен"
      text="Попробуйте обновить страницу или зайдите позже"
      errorCode={500}
    />
  );
}
