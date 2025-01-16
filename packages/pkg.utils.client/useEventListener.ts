/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */

import { useEffect, useRef } from 'react';

type UseEventListenerOptions = {
  once?: boolean;
};

export function useEventListener<T extends EventTarget, E extends Event = Event>(
  target: T | null,
  eventType: string,
  callback: (event: E) => void,
  options: UseEventListenerOptions = {},
): () => void {
  const { once = false } = options;
  const handlerRef = useRef<((event: E) => void) | null>(null);
  const unsubscribeRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!target || typeof (target as any).addEventListener !== 'function') return;

    const handler = (event: Event) => {
      // Приводим тип события к E, если уверены, что это корректный тип.
      callback(event as E);

      if (once) {
        target.removeEventListener(eventType, handler);
      }
    };

    handlerRef.current = handler as (event: E) => void;
    target.addEventListener(eventType, handler);

    unsubscribeRef.current = () => {
      if (handlerRef.current) {
        target.removeEventListener(eventType, handlerRef.current as EventListener);
        handlerRef.current = null;
      }
    };

    return () => {
      if (handlerRef.current) {
        target.removeEventListener(eventType, handlerRef.current as EventListener);
        handlerRef.current = null;
      }
    };
  }, [target, eventType, callback, once]);

  return unsubscribeRef.current;
}
