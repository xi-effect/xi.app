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

  return <div>Loading... ....</div>;
}
