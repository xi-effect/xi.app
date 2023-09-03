'use client';

import { useMainSt } from 'store/main';

import { SignIn } from 'pkg.signin.form';

import React from 'react';
import { Stack, useMediaQuery } from '@mui/material';

export default function SigninPage() {
  const signIn = useMainSt((state) => state.signIn);
  const onSignIn = useMainSt((state) => state.onSignIn);

  const isMobile: boolean = useMediaQuery('(max-width: 472px)');

  return (
    <Stack
      justifyContent={isMobile ? 'flex-start' : 'center'}
      alignItems="center"
      sx={{ width: '100%', minHeight: '100vh', height: '100%' }}
    >
      <Stack
        direction="column"
        padding={isMobile ? '16px 20px 0 20px' : '32px'}
        spacing={2}
        sx={{
          width: isMobile ? '100%' : '420px',
          height: isMobile ? '395px' : '514px',
          borderRadius: '16px',
          border: isMobile ? 'none' : '1px solid',
          borderColor: isMobile ? 'none' : 'gray.10',
          position: 'relative',
        }}
      >
        <SignIn signIn={signIn} onSignIn={onSignIn} />
      </Stack>
    </Stack>
  );
}
