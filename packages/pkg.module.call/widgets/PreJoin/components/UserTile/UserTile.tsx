/* eslint-disable jsx-a11y/media-has-caption */
import { useMainSt } from 'pkg.stores';
import { Avatar, AvatarFallback, AvatarImage } from '@xipkg/avatar';
import React, { useMemo, useRef } from 'react';
import { facingModeFromLocalTrack, Track, LocalVideoTrack } from 'livekit-client';
import { usePreviewTracks } from '@livekit/components-react';
import { useCallStore } from '../../../../stores';
import { Controls } from './Controls';

export const UserTile = () => {
  const userId = useMainSt((state) => state.user.id);

  const audioDeviceId = useCallStore((state) => state.audioDeviceId);
  const audioEnabled = useCallStore((state) => state.audioEnabled);

  const videoDeviceId = useCallStore((state) => state.videoDeviceId);
  const videoEnabled = useCallStore((state) => state.videoEnabled);

  const onError = () => {};

  const videoEl = useRef(null);

  const tracks = usePreviewTracks(
    {
      audio: audioEnabled ? { deviceId: audioDeviceId } : false,
      video: videoEnabled ? { deviceId: videoDeviceId } : false,
    },
    onError,
  );

  const videoTrack = useMemo(
    () => tracks?.filter((track) => track.kind === Track.Kind.Video)[0] as LocalVideoTrack,
    [tracks],
  );

  const facingMode = useMemo(() => {
    if (videoTrack) {
      const { facingMode } = facingModeFromLocalTrack(videoTrack);
      return facingMode;
    }
    return 'undefined';
  }, [videoTrack]);

  console.log('videoEnabled', videoEnabled);
  console.log('videoDeviceId', videoDeviceId);
  console.log('videoTrack', videoTrack);

  return (
    <div
      data-theme="dark"
      className="bg-gray-10 relative flex aspect-video h-full w-full items-center justify-center overflow-hidden rounded-[16px]"
    >
      <div className="relative">
        {videoTrack && videoEnabled && (
          <div className="aspect-video h-full w-full [transform:rotateY(180deg)]">
            <video
              ref={videoEl}
              data-lk-facing-mode={facingMode}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        {(!videoTrack || !videoEnabled) && (
          <div className="bg-gray-10 flex items-center justify-center rounded-[16px]">
            <Avatar size="xxl">
              <AvatarImage
                src={`https://auth.xieffect.ru/api/users/${userId}/avatar.webp`}
                imageProps={{
                  src: `https://auth.xieffect.ru/api/users/${userId}/avatar.webp`,
                  alt: 'user avatar',
                }}
                alt="user avatar"
              />
              <AvatarFallback size="xxl" loading />
            </Avatar>
          </div>
        )}
      </div>
      <div className="absolute bottom-5 left-5">
        <Controls />
      </div>
    </div>
  );
};
