import { useEffect, useRef, useState } from 'react';
import { useUIStore } from '../store';

export const useIsStageScaling = () => {
  const [isScaling, setIsScaling] = useState(false);
  const { scale } = useUIStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setIsScaling(true);
    timeoutRef.current = setTimeout(() => setIsScaling(false), 280);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [scale]);

  return { isScaling };
};
