import { useEffect, useMemo } from 'react';
import { getOrCreateInstance, releaseInstance, getKeys } from '../services';

export const useYJS = (roomId: string, hostUrl: string) => {
  // Получаем инстанс YJS
  const instance = useMemo(() => getOrCreateInstance(roomId, hostUrl), [roomId, hostUrl]);

  // Освобождаем инстанс при размонтировании
  useEffect(
    () => () => {
      releaseInstance(roomId, hostUrl);
    },
    [roomId, hostUrl],
  );

  return {
    yDoc: instance.yDoc,
    yArr: instance.yArr,
    yStore: instance.yStore,
    provider: instance.provider,
    getYJSKeys: () => getKeys(instance),
    isConnected: instance.provider.isConnected,
  };
};
