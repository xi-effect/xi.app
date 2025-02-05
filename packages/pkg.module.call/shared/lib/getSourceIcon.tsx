import React from 'react';
import { Track } from 'livekit-client';
import { Conference, Microphone, Screenshare } from '@xipkg/icons';
import { ActionButton } from '../ui';

export const getSourceIcon = (source: Track.Source, enabled: boolean) => {
  switch (source) {
    case Track.Source.Microphone:
      return <ActionButton icon={<Microphone className="fill-gray-100" />} enable={enabled} />;
    case Track.Source.Camera:
      return <ActionButton icon={<Conference className="fill-gray-100" />} enable={enabled} />;
    case Track.Source.ScreenShare:
      return <ActionButton icon={<Screenshare className="fill-gray-100" />} enable={enabled} />;
    default:
      return undefined;
  }
};
