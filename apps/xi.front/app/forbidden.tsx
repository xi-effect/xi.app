'use client';

import { ErrorPage } from 'pkg.error-page';
import { Link } from '@xipkg/link';
import { useRouter } from 'next/navigation';

export default function Forbidden403() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
    router.refresh();
  };

  return (
    <ErrorPage
      title="Доступ запрещён"
      errorCode={403}
      text="У вас нет прав на просмотр данной страницы"
    >
      <p className="text-gray-80 text-m-base">
        Вернитесь&nbsp;
        <button
          type="button"
          className="decoration-brand-20 hover:decoration-brand-100 text-brand-80 hover:text-brand-100 underline underline-offset-4 bg-transparent"
          onClick={handleBack}
        >
          назад
        </button>
        &nbsp;или&nbsp;
        <Link theme="brand" size="l" href="/">
          на главную
        </Link>
      </p>
    </ErrorPage>
  );
}
