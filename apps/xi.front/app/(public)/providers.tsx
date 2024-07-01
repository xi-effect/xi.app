'use client';

import React from 'react';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import Load from '../load';
import { useMainSt } from 'pkg.stores';

const PublicProvider = async ({ children }) => {
  const socket = useMainSt((state) => state.socket);
  const getUser = useMainSt((state) => state.getUser);
  const isLogin = useMainSt((state) => state.isLogin);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log('isLogin', isLogin, socket);
    if (isLogin === true) {
      redirect('/communities');
    }
  }, [isLogin]);

  if (isLogin === null) return <Load />;

  return children;
};

export default PublicProvider;
