'use client';

import React from 'react';
import { Track } from 'livekit-client';
import { TrackToggle, useDisconnectButton } from '@livekit/components-react';
import { Chat, Conference, Endcall, Group, Hand, Microphone, Screenshare } from '@xipkg/icons';

const DisconnectButton = () => {
    const { buttonProps } = useDisconnectButton({});

    return (
      <button
        type="button"
        {...buttonProps}
        className="bg-red-80 ml-2 flex h-12 w-12 flex-row items-center justify-center rounded-[24px] hover:bg-red-100"
      >
        <Endcall className="fill-gray-0" />
      </button>
    );
};

const MicrophoneButton = ({ audioEnable }: { audioEnable: boolean }) => (
  <div
    className={`border-4 ${audioEnable ? 'border-green-60' : 'border-red-60'} ml-0.5 flex h-12 w-12 flex-row items-center justify-center rounded-[24px] bg-gray-100`}
  >
    <TrackToggle
      source={Track.Source.Microphone}
      showIcon={false}
      className="bg-transparent"
    >
      <Microphone className="fill-red-0" />
    </TrackToggle>
  </div>
);

const CameraButton = ({ videoEnable }: { videoEnable: boolean }) => (
  <div
    className={`border-4 ${videoEnable ? 'border-green-60' : 'border-red-60'} ml-0.5 flex h-12 w-12 flex-row items-center justify-center rounded-[24px] bg-gray-100`}
  >
    <TrackToggle
      source={Track.Source.Camera}
      showIcon={false}
      className="bg-transparent"
    >
      <Conference className="fill-red-0" />
    </TrackToggle>
  </div>
);

const ShareButton = () => (
  <TrackToggle
    source={Track.Source.ScreenShare}
    showIcon={false}
    className="ml-8 flex h-12 w-12 flex-row items-center justify-center rounded-[24px] bg-gray-100"
  >
    <Screenshare className="fill-red-0" />
  </TrackToggle>
);

const GroupButton = () => (
  <TrackToggle
    source={Track.Source.Camera}
    showIcon={false}
    className="flex h-10 w-10 flex-row items-center justify-center rounded-[20px] bg-gray-100"
  >
    <Group className="fill-red-0" />
  </TrackToggle>
);

const ChatButton = () => (
  <TrackToggle
    source={Track.Source.Camera}
    showIcon={false}
    className="flex h-10 w-10 flex-row items-center justify-center rounded-[20px] bg-gray-100"
  >
    <Chat className="fill-red-0" />
  </TrackToggle>
);

const HandButton = () => (
  <TrackToggle
    source={Track.Source.Camera}
    showIcon={false}
    className="flex h-10 w-10 flex-row items-center justify-center rounded-[20px] bg-gray-100"
    aria-label="Поднять руку"
  >
    <Hand className="fill-red-0" />
  </TrackToggle>
);

interface IBottomBar {
    audioEnable: boolean,
    videoEnable: boolean
}

export const BottomBar = ({ audioEnable, videoEnable }: IBottomBar) => (
  <div className="flex w-full flex-row justify-between p-4">
    <div className="flex flex-row">
      <MicrophoneButton audioEnable={audioEnable} />
      <CameraButton videoEnable={videoEnable} />
      <ShareButton />
    </div>

    <div className="flex h-12 w-[144px] flex-row items-center justify-center gap-2 rounded-[24px] bg-gray-100 p-1">
      <GroupButton />
      <ChatButton />
      <HandButton />
    </div>
    <DisconnectButton />
  </div>);
