import { useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const isBrowser = typeof window !== 'undefined';

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser) {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error('Не удалось прочитать данные из localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (isBrowser) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error('Не удалось записать данные в localStorage:', error);
      }
    }
  }, [key, storedValue, isBrowser]);

  const setValue = (value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const newValue = value instanceof Function ? value(prev) : value;
      return newValue;
    });
  };

  return [storedValue, setValue];
}
