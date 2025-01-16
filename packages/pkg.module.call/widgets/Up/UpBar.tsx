/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import React, { useEffect } from 'react';
import {
  Grid,
  // Settings,
  // External,
  Speaker,
  SpeakerHorizontal,
  Maximize,
  Minimize,
  Settings as SettingsIcon,
} from '@xipkg/icons';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useFullScreen } from 'pkg.utils.client';
import { useMainSt } from 'pkg.stores';
import { Settings } from './Settings';

export const UpBar = () => {
  const params = useParams<{ 'community-id': string; 'channel-id': string }>();

  const channels = useMainSt((state) => state.channels);
  const categories = useMainSt((state) => state.categories);
  const currentCall = channels?.filter((item) => Number(params['channel-id']) === item.id);

  const router = useRouter();
  const pathname = usePathname();
  const [carouselType, setCarouselType] = React.useState<string>('grid');
  const { isFullScreen, toggleFullScreen } = useFullScreen('videoConferenceContainer');

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
      return <Speaker className="fill-gray-100" />;
    }
    if (carouselType === 'vertical') {
      return <SpeakerHorizontal className="fill-gray-100" />;
    }
    return <Grid className="fill-gray-100" />;
  };

  if (!currentCall || currentCall.length === 0) return null;

  const currentCallsCategory =
    typeof currentCall[0].categoryId === 'number'
      ? categories?.filter((item) => currentCall[0].categoryId === item.id)
      : null;

  return (
    <div className="flex w-full flex-row items-end p-4">
      <span className="text-2xl font-semibold text-gray-100">{currentCall[0].name}</span>
      {currentCallsCategory && (
        <span className="text-gray-70 ml-2">{currentCallsCategory[0].name}</span>
      )}

      <button
        onClick={toggleLayout}
        type="button"
        className="bg-gray-0 ml-auto flex h-10 w-[95px] flex-row items-center justify-center gap-2 rounded-[20px]"
      >
        {getViewIcon()}
        <span className="text-gray-100">Вид</span>
      </button>
      <button
        onClick={toggleFullScreen}
        type="button"
        className="bg-gray-0 ml-2 hidden h-10 w-10 flex-row items-center justify-center rounded-[20px] md:flex"
      >
        {isFullScreen ? (
          <Minimize className="fill-gray-100" />
        ) : (
          <Maximize className="fill-gray-100" />
        )}
      </button>
      {/* <button
        type="button"
      className="bg-gray-0 ml-2 flex h-10 w-10 flex-row items-center justify-center rounded-[20px]"
      >
        <External className="fill-gray-100" />
      </button> */}
      <Settings>
        <button
          type="button"
          className="bg-gray-0 flex h-10 w-10 flex-row items-center justify-center rounded-[20px]"
        >
          <SettingsIcon className="fill-gray-100" />
        </button>
      </Settings>
    </div>
  );
};
