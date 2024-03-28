import { useRef } from 'react';

type DebouncedFunction<F extends (...args: any[]) => any> = (...args: Parameters<F>) => void;

export const useDebouncedFunction = <F extends (...args: any[]) => any>(
  func: F,
  delay: number,
): DebouncedFunction<F> => {
  const ref = useRef<NodeJS.Timeout | null>(null);

  return (...args: Parameters<F>) => {
    if (ref.current) {
      clearTimeout(ref.current);
    }

    ref.current = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
