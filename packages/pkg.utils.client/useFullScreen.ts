import { useState, useEffect } from 'react';

export const useFullScreen = (containerId: string) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    const element = document.getElementById(containerId);
    const fullScreen = document.fullscreenElement;

    if (fullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      element?.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      const fullScreen = !!document.fullscreenElement;
      setIsFullScreen(fullScreen);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return { toggleFullScreen, isFullScreen };
};
