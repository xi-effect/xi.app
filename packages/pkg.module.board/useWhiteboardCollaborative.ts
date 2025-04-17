// hooks/useWhiteboardCollaborative.ts
import { useEffect, useState, useRef } from 'react';
import { useBoardStore } from './store';
import { BoardElement } from './types';
import { useYjs } from './hooks';

export const useWhiteboardCollaborative = ({
  roomId = 'roomid',
  hostUrl = 'wss://hocus.xieffect.ru',
}: {
  roomId?: string;
  hostUrl?: string;
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const isUpdatingRef = useRef<boolean>(false);
  let hasConnectedBefore = false;

  const { addElement, updateElement, removeElement, boardElements } = useBoardStore();
  const { yDoc, provider, yStore, yArr, getYJSKeys } = useYjs(roomId, hostUrl);

  // Синхронизирует один элемент из YJS в локальный стор
  const synchronizeElementFromYjs = (elementId: string) => {
    // получаем элемент из yjs стора
    const json = yStore.get(elementId);
    if (!json) return;

    try {
      const element = JSON.parse(json) as BoardElement;
      const existingElement = boardElements.find((el) => el.id === elementId);
      // проверяем есть ли элемент в локальном сторе, если не добавляем, если есть то обновляем
      if (!existingElement) {
        addElement(element);
      } else if (JSON.stringify(existingElement) !== JSON.stringify(element)) {
        updateElement(elementId, element);
      }
    } catch (error) {
      console.error(`Error parsing JSON for key ${elementId} during sync:`, error);
    }
  };

  useEffect(() => {
    const unsubs: (() => void)[] = [];

    // Синхронизация изменений из стора в YJS
    unsubs.push(
      useBoardStore.subscribe((state) => {
        if (isUpdatingRef.current) return;

        const { boardElements } = state;

        try {
          isUpdatingRef.current = true;
          const yjsKeys = getYJSKeys();
          const storeKeysSet = new Set(boardElements.map((el) => el.id));

          yDoc.transact(() => {
            yjsKeys.forEach((key) => {
              if (!storeKeysSet.has(key)) {
                yStore.delete(key);
              }
            });

            boardElements.forEach((element) => {
              const key = element.id;
              const existingJson = yStore.get(key);

              if (!existingJson || JSON.stringify(element) !== existingJson) {
                yStore.set(key, JSON.stringify(element));
              }
            });
          });
        } catch (error) {
          console.error('Error updating YJS:', error);
        } finally {
          isUpdatingRef.current = false;
        }
      }),
    );

    // Обрабатывает изменения, поступающие из YJS
    const handleChange = (
      changes: Map<
        string,
        | { action: 'delete'; oldValue?: string }
        | { action: 'update'; oldValue?: string; newValue: string }
        | { action: 'add'; newValue: string }
      >,
    ) => {
      if (isUpdatingRef.current) return;

      try {
        isUpdatingRef.current = true;

        changes.forEach((change, id) => {
          if (change.action === 'update' || change.action === 'add') {
            synchronizeElementFromYjs(id);
          } else if (change.action === 'delete') {
            removeElement(id);
          }
        });
      } catch (error) {
        console.error('Error updating store:', error);
      } finally {
        isUpdatingRef.current = false;
      }
    };

    // Выполняет полную синхронизацию данных при подключении
    const handleSync = () => {
      const keys = getYJSKeys();
      const yjsKeys = new Set(keys);
      // Удаляем элементы, которых нет в YJS
      boardElements.forEach((element) => {
        if (!yjsKeys.has(element.id)) {
          removeElement(element.id);
        }
      });
      // Обрабатываем каждый ключ из YJS
      keys.forEach((key) => {
        synchronizeElementFromYjs(key);
      });
    };

    // Обрабатывает изменения статуса соединения
    const handleStatusChange = ({ status }: { status: 'disconnected' | 'connected' }) => {
      setIsConnected(status === 'connected');

      if (status === 'disconnected') {
        return;
      }

      provider.off('synced', handleSync);

      if (status === 'connected') {
        if (hasConnectedBefore) return;
        hasConnectedBefore = true;
        provider.on('synced', handleSync);
        unsubs.push(() => provider.off('synced', handleSync));
      }
    };

    provider.on('status', handleStatusChange);
    unsubs.push(() => provider.off('status', handleStatusChange));

    // Подписываемся на изменения YJS
    yStore.on('change', handleChange);
    unsubs.push(() => yStore.off('change', handleChange));

    return () => {
      unsubs.forEach((fn) => fn());
      unsubs.length = 0;
    };
  }, [
    provider,
    yDoc,
    yArr,
    yStore,
    roomId,
    addElement,
    updateElement,
    removeElement,
    boardElements,
  ]);

  return {
    isConnected,
  };
};
