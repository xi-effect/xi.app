'use client';

import { ThemeProvider } from 'next-themes';
import { useMainSt } from 'pkg.stores';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useMainSt((state) => state.socket);
  console.log('socket', socket);

  socket?.on('connect', () => {
    console.info('SIO connect', socket?.id);
  });

  socket?.on('disconnect', (reason) => {
    // the reason of the disconnection, for example "transport error"
    console.log('disconnect', reason);
  });

  socket?.on('connect_error', (err) => {
    // the reason of the error, for example "xhr poll error"
    console.log('connect_error', err.message);

    // some additional description, for example the status code of the initial HTTP response
    console.log(err.description);

    // some additional context, for example the XMLHttpRequest object
    console.log(err.context);
  });

  return children;
};

type ProvidersT = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersT) => (
  <ThemeProvider defaultTheme="light" themes={['light', 'dark']} attribute="data-theme">
    <Toaster visibleToasts={1} />
    <SocketProvider>{children}</SocketProvider>
  </ThemeProvider>
);
