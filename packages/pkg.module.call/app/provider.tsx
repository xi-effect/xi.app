import React, { ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { ErrorPage } from 'pkg.error-page';
import { useLivekitToken } from '../shared/hooks';

type CallPropsT = {
  children: ReactNode;
};

export const CallProvider = ({ children }: CallPropsT) => {
  const params = useParams<{ 'community-id': string; 'channel-id': string }>();
  const { token, error } = useLivekitToken(params['community-id'], params['channel-id']);

  if (error) {
    return (
      <ErrorPage
        errorCode={Number(error.cause) || 500}
        title="Ошибка"
        text="Что-то сломалось в этой части приложения, попробуйте обновить страницу"
        withLogo={false}
      />
    );
  }

  if (!token) {
    return (
      <div className="bg-gray-0 flex h-full w-full flex-col">
        <div className="flex flex-auto flex-col items-center justify-center p-4 md:p-5">
          <div className="flex justify-center">
            <div
              className="text-brand-80 inline-block size-6 animate-spin rounded-full border-[3px] border-current border-t-transparent"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
