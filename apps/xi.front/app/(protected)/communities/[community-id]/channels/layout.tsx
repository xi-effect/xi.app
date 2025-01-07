'use client';

import { ErrorPage } from 'pkg.error-page';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function CommunityLayout({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <ErrorPage
          errorCode={500}
          title="Ошибка"
          text="Что-то сломалось в этой части приложения, попробуйте обновить страницу"
          withLogo={false}
        />
      }
    >
      {children}
    </ErrorBoundary>
  );
}
