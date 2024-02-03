'use client';

import React from 'react';
import { Track } from 'livekit-client';
import { TrackToggle, useDisconnectButton } from '@livekit/components-react';
import { Chat, Conference, Endcall, Group, Hand, Microphone, Screenshare } from '@xipkg/icons';

const DisconnectButton = () => {
  const { buttonProps } = useDisconnectButton({});

  return (
    <button
      {...buttonProps}
      className="h-12 w-12 rounded-[24px] bg-red-80 flex flex-row items-center justify-center ml-2 hover:bg-red-100"
    >
      <Endcall className="fill-gray-0" />
    </button>
  );
};

const MicrophoneButton = () => {
  return (
    <TrackToggle
      source={Track.Source.Microphone}
      showIcon={false}
      className="h-12 w-12 rounded-[24px] bg-gray-100 flex flex-row items-center justify-center"
    >
      <Microphone className={`fill-red-0`} />
    </TrackToggle>
  );
};

const CameraButton = () => {
  return (
    <TrackToggle
      source={Track.Source.Camera}
      showIcon={false}
      className="h-12 w-12 rounded-[24px] bg-gray-100 flex flex-row items-center justify-center ml-0.5"
    >
      <Conference className={`fill-red-0`} />
    </TrackToggle>
  );
};

const ShareButton = () => {
  return (
    <TrackToggle
      source={Track.Source.ScreenShare}
      showIcon={false}
      className="h-12 w-12 rounded-[24px] bg-gray-100 flex flex-row items-center justify-center ml-8"
    >
      <Screenshare className={`fill-red-0`} />
    </TrackToggle>
  );
};

const GroupButton = () => {
  return (
    <TrackToggle
      source={Track.Source.Camera}
      showIcon={false}
      className="h-10 w-10 rounded-[20px] bg-gray-100 flex flex-row items-center justify-center"
    >
      <Group className={`fill-red-0`} />
    </TrackToggle>
  );
};

const ChatButton = () => {
  return (
    <TrackToggle
      source={Track.Source.Camera}
      showIcon={false}
      className="h-10 w-10 rounded-[20px] bg-gray-100 flex flex-row items-center justify-center"
    >
      <Chat className={`fill-red-0`} />
    </TrackToggle>
  );
};

const HandButton = () => {
  return (
    <TrackToggle
      source={Track.Source.Camera}
      showIcon={false}
      className="h-10 w-10 rounded-[20px] bg-gray-100 flex flex-row items-center justify-center"
      aria-label="Поднять руку"
    >
      <Hand className={`fill-red-0`} />
    </TrackToggle>
  );
};

export const BottomBar = () => {
  return (
    <div className="p-4 w-full flex flex-row justify-between">
      <div className="flex flex-row">
        <MicrophoneButton />
        <CameraButton />
        <ShareButton />
      </div>

      <div className="h-12 w-[144px] rounded-[24px] bg-gray-100 flex flex-row items-center justify-center p-1 gap-2">
        <GroupButton />
        <ChatButton />
        <HandButton />
      </div>
      <DisconnectButton />
    </div>
  );
};
