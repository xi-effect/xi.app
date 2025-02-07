/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useWhiteboardCollaborative.ts
import { useEffect } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket'; // Если у вас есть HocuspocusProvider – замените здесь
import { useBoardStore } from './store/useBoardStore';
import { BoardElement } from './types';

export const useWhiteboardCollaborative = () => {
  useEffect(() => {
    const ydoc = new Y.Doc();
    // Подключение к серверу совместного редактирования
    const provider = new WebsocketProvider(
      'wss://your-hocuspocus-server.com',
      'whiteboard-room',
      ydoc,
    );

    const yElements = ydoc.getArray<BoardElement>('boardElements');
    const { addElement, clearBoard } = useBoardStore.getState();

    // Наблюдаем за изменениями в Yjs-массиве и синхронизируем локальное состояние
    yElements.observeDeep(() => {
      const elements = yElements.toArray();
      // Для простоты очищаем и перезаписываем все элементы
      // – в продакшене рекомендуется реализовать более «умный» diff
      clearBoard();
      elements.forEach((el) => addElement(el));
    });

    // Подписываемся на изменения в локальном состоянии и отправляем их в Yjs
    const unsubscribe = useBoardStore.subscribe(
      (state: any) => state.boardElements,
      (boardElements) => {
        yElements.delete(0, yElements.length);
        boardElements.forEach((el) => yElements.push([el]));
      },
    );

    return () => {
      unsubscribe();
      provider.disconnect();
      ydoc.destroy();
    };
  }, []);
};
