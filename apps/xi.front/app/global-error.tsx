'use client';

import { ErrorPage } from 'pkg.error-page';

export default function Error500() {
  return (
    <ErrorPage
      title="Сервис недоступен"
      text="Попробуйте обновить страницу или зайдите позже"
      errorCode={500}
    />
  );
}
