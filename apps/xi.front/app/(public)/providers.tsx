'use client';

import React, { ReactNode, useEffect } from 'react';

import { redirect } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import Load from '../load';

type PublicProviderPropsT = {
  children: ReactNode;
};

const PublicProvider = ({ children }: PublicProviderPropsT) => {
  const getUser = useMainSt((state) => state.getUser);
  const isLogin = useMainSt((state) => state.isLogin);

  useEffect(() => {
    getUser();
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
