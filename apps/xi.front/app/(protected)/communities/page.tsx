'use client';

import { redirect } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import { useEffect } from 'react';

export default function CommunitiesLoading() {
  const isLogin = useMainSt((state) => state.isLogin);

  // Если вдруг что-то пошло не так, ещё раз иницируем соединение сокета
  // В initSocket есть предотвращение инициализации нескольких соединений
  const initSocket = useMainSt((state) => state.initSocket);
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
