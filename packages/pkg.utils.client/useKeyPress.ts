import { useEffect } from 'react';

export const useKeyPress = (targetKey: string, callback: () => void) => {
  useEffect(() => {
    // console.log(`Added listener for ${targetKey}`);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // console.log(`Removed listener for ${targetKey}`);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [targetKey, callback]);
};
