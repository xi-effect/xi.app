'use client';

import { ErrorPage } from 'pkg.error-page';

export default function Error400() {
  return (
    <ErrorPage
      title="Ошибка на странице"
      text="Попробуйте зайти на страницу позже"
      errorCode={400}
    />
  );
}
