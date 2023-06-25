'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getScheme } from '@xipkg/theme';
import { EmotionCacheProvider } from './EmotionCache';

export function ThemeRegistry({
  mode,
  children,
}: {
  mode: 'light' | 'dark';
  children: React.ReactNode;
}) {
  const theme = getScheme(mode);

  return (
    <EmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionCacheProvider>
  );
}
