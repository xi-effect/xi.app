'use client';

import React, { ReactNode, useEffect } from 'react';

import { redirect } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import { useTheme } from 'next-themes';
import Load from '../load';

type PublicProviderPropsT = {
  children: ReactNode;
};

const PublicProvider = ({ children }: PublicProviderPropsT) => {
  const getUser = useMainSt((state) => state.getUser);
  const isLogin = useMainSt((state) => state.isLogin);
  const { setTheme } = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      const get = await getUser();

      if (get.theme !== null) {
        setTheme(get.theme);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (isLogin === true) {
      redirect('/communities');
    }
  }, [isLogin]);

  if (isLogin === null) return <Load />;

  return children;
};

export default PublicProvider;
