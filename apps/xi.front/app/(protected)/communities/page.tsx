'use client';

import { redirect } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function CommunitiesLoading() {
  const isLogin = useMainSt((state) => state.isLogin);
  const initSocket = useMainSt((state) => state.initSocket);

  // Тоже костыль
  useEffect(() => {
    const toastTimerId = setTimeout(() => {
      toast('Упс, проблемы с загрузкой');
      initSocket();
    }, 10000);

    const redirectTimerId = setTimeout(() => {
      redirect('/communities');
    }, 11000);

    return () => {
      clearTimeout(toastTimerId);
      clearTimeout(redirectTimerId);
    };
  }, []);

  // Если вдруг что-то пошло не так, ещё раз иницируем соединение сокета
  // В initSocket есть предотвращение инициализации нескольких соединений
  useEffect(() => {
    initSocket();
  }, []);

  useEffect(() => {
    if (isLogin === false) {
      redirect('/signin');
    }
  }, [isLogin]);

  return (
    <>
      <div className="hidden md:flex">
        <div className="p-8 w-[calc(100vw-350px)] overflow-auto h-full">
          <div className="pb-8 max-w-[1570px]">
            <div className="flex gap-4 sm:flex-col xl:flex-row">
              <div className="bg-gray-10 h-[48px] w-full animate-pulse rounded-[4px]" />
              <div className="flex gap-2 w-full">
                <div className="bg-gray-10 h-[48px] w-[48px] animate-pulse rounded-full shrink-0" />
                <div className="bg-gray-10 h-[48px] w-full animate-pulse rounded-[4px]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-gray-10 h-[32px] w-[400px] animate-pulse rounded-[4px]" />
            </div>
          </div>
          <div className="grid py-8 max-xs:py-4 gap-12 max-w-[1570px] xl:grid-cols-3">
            <div className="flex flex-col gap-2">
              <div className="bg-gray-10 h-[240px] w-full animate-pulse rounded-2xl" />
              <div className="bg-gray-10 h-[32px] w-full animate-pulse rounded-[4px]" />
              <div className="bg-gray-10 h-[72px] w-full animate-pulse rounded-[4px]" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-gray-10 h-[240px] w-full animate-pulse rounded-2xl" />
              <div className="bg-gray-10 h-[32px] w-full animate-pulse rounded-[4px]" />
              <div className="bg-gray-10 h-[72px] w-full animate-pulse rounded-[4px]" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-gray-10 h-[240px] w-full animate-pulse rounded-2xl" />
              <div className="bg-gray-10 h-[32px] w-full animate-pulse rounded-[4px]" />
              <div className="bg-gray-10 h-[72px] w-full animate-pulse rounded-[4px]" />
            </div>
          </div>
          <div className="py-8 max-xs:py-4 w-full max-w-[1570px]">
            <div className="bg-gray-10 h-[248px] w-full animate-pulse rounded-2xl" />
          </div>
        </div>
      </div>
      <div className="relative flex md:hidden">
        <div className="p-4 w-[100vw] overflow-auto h-full">
          <div className="pb-8 max-w-[1570px]">
            <div className="flex gap-4 sm:flex-col xl:flex-row">
              <div className="bg-gray-10 h-[48px] w-full animate-pulse rounded-[4px]" />
              <div className="flex gap-2 w-full">
                <div className="bg-gray-10 h-[48px] w-[48px] animate-pulse rounded-full shrink-0" />
                <div className="bg-gray-10 h-[48px] w-full animate-pulse rounded-[4px]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-gray-10 h-[32px] w-full animate-pulse rounded-[4px]" />
            </div>
          </div>
          <div className="grid py-8 max-xs:py-4 gap-12 max-w-[1570px] xl:grid-cols-3">
            <div className="flex flex-col gap-2">
              <div className="bg-gray-10 h-[240px] w-full animate-pulse rounded-2xl" />
              <div className="bg-gray-10 h-[32px] w-full animate-pulse rounded-[4px]" />
              <div className="bg-gray-10 h-[72px] w-full animate-pulse rounded-[4px]" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-gray-10 h-[240px] w-full animate-pulse rounded-2xl" />
              <div className="bg-gray-10 h-[32px] w-full animate-pulse rounded-[4px]" />
              <div className="bg-gray-10 h-[72px] w-full animate-pulse rounded-[4px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
