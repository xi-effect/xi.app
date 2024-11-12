import { HocuspocusProvider } from '@hocuspocus/provider';
import { useMemo } from 'react';

export const useProvider = () => {
  const provider = useMemo(
    () =>
      new HocuspocusProvider({
        url: 'wss://hocus.xieffect.ru',
        name: 'test/slate-yjs-demo',
        connect: false,
        broadcast: false,
        forceSyncInterval: 20000,
        onAuthenticated: () => {},
        onAuthenticationFailed: (data) => {
          console.log('onAuthenticationFailed', data);
          if (data.reason === 'permission-denied') {
            console.error('hocuspocus: permission-denied');
          }
        },
      }),
    [],
  );
  return provider;
};
