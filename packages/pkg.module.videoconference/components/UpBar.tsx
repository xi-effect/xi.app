/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import React, { useEffect } from 'react';
import {
  Grid,
  Settings,
  External,
  Speaker,
  SpeakerHorizontal,
  Maximize,
  Minimize,
} from '@xipkg/icons';
import { usePathname, useRouter } from 'next/navigation';
import { useFullScreen } from 'pkg.utils/useFullScreen';

export const UpBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [carouselType, setCarouselType] = React.useState<string>('grid');
  const { isFullScreen, toggleFullScreen } = useFullScreen('videoConferenceContainer');

  useEffect(() => {
    if (isFullScreen == null) return;
    sessionStorage.setItem('fullScreenVideoConference', String(isFullScreen));
  }, [isFullScreen]);

  const toggleLayout = () => {
    setCarouselType((prev) => {
      if (prev === 'horizontal') return 'vertical';
      if (prev === 'vertical') return 'grid';
      if (prev === 'grid') return 'horizontal';
      return 'horizontal';
    });
  };

  useEffect(() => {
    if (carouselType === 'horizontal' || carouselType === 'vertical') {
      router.push(`${pathname}?carouselType=${carouselType}`);
    } else if (carouselType === 'grid') {
      router.push(pathname);
    }
  }, [carouselType]);

  const getViewIcon = () => {
    if (carouselType === 'horizontal') {
      return <Speaker className="fill-gray-0" />;
    }
    if (carouselType === 'vertical') {
      return <SpeakerHorizontal className="fill-gray-0" />;
    }
    return <Grid className="fill-gray-0" />;
  };

  return (
    <div className="flex w-full flex-row items-end p-4">
      <span className="text-gray-0 text-2xl font-semibold">B1.2</span>
      <span className="text-gray-40 ml-2">Upper-intermediate</span>

      <button
        onClick={toggleLayout}
        type="button"
        className="ml-auto flex h-10 w-[95px] flex-row items-center justify-center gap-2 rounded-[20px] bg-gray-100"
      >
        {getViewIcon()}
        <span className="text-gray-0">Вид</span>
      </button>
      <button
        onClick={toggleFullScreen}
        type="button"
        className="ml-2 flex h-10 w-10 flex-row items-center justify-center rounded-[20px] bg-gray-100"
      >
        {isFullScreen ? <Maximize className="fill-gray-0" /> : <Minimize className="fill-gray-0" />}
      </button>
      <button
        type="button"
        className="ml-2 flex h-10 w-10 flex-row items-center justify-center rounded-[20px] bg-gray-100"
      >
        <External className="fill-gray-0" />
      </button>
      <button
        type="button"
        className="ml-2 flex h-10 w-10 flex-row items-center justify-center rounded-[20px] bg-gray-100"
      >
        <Settings className="fill-gray-0" />
      </button>
    </div>
  );
};
