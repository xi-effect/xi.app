import * as Y from 'yjs';
import { YKeyValue } from 'y-utility/y-keyvalue';
import { HocuspocusProvider } from '@hocuspocus/provider';

/** Испольование инстанса YJS позволяет избежать
 * многократного сздания соект соединения при монтировании компонента
 */

type YJSInstanceT = {
  yDoc: Y.Doc;
  yArr: Y.Array<{ key: string; val: string }>;
  yStore: YKeyValue<string>;
  provider: HocuspocusProvider;
  refCount: number;
};

// Приватное хранилище инстансов
const instances: Record<string, YJSInstanceT> = {};

/**
 * Получает или создает YJS инстанс для заданного идентификатора комнаты
 */
export const getOrCreateInstance = (roomId: string, hostUrl: string): YJSInstanceT => {
  const instanceKey = `${roomId}@${hostUrl}`;

  if (!instances[instanceKey]) {
    const yDoc = new Y.Doc({ gc: true });
    const yArr = yDoc.getArray<{ key: string; val: string }>('xi_board');
    const yStore = new YKeyValue(yArr);

    const provider = new HocuspocusProvider({
      url: hostUrl,
      name: roomId,
      token: roomId,
      document: yDoc,
    });

    instances[instanceKey] = { yDoc, yArr, yStore, provider, refCount: 0 };
  }

  // eslint-disable-next-line no-plusplus
  instances[instanceKey].refCount++;
  return instances[instanceKey];
};

/**
 * Освобождает инстанс YJS
 */
export const releaseInstance = (roomId: string, hostUrl: string = 'wss://hocus.xieffect.ru') => {
  const instanceKey = `${roomId}@${hostUrl}`;

  if (instances[instanceKey]) {
    // eslint-disable-next-line no-plusplus
    instances[instanceKey].refCount--;

    if (instances[instanceKey].refCount <= 0) {
      instances[instanceKey].provider.destroy();
      delete instances[instanceKey];
    }
  }
};

/**
 * Получает список ключей из YJS хранилища
 */
export const getKeys = (instance: YJSInstanceT) => instance.yArr.toArray().map((item) => item.key);
