'use client';

import { ErrorPage } from 'pkg.error-page';
import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import React from 'react';

export default function Error500({ error }: { error: Error }) {
  React.useEffect(() => {
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
