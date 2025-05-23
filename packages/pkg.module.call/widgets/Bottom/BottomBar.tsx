'use client';

import React from 'react';
import {
  ControlBarProps,
  useDisconnectButton,
  useLocalParticipant,
  useLocalParticipantPermissions,
  usePersistentUserChoices,
} from '@livekit/components-react';
import { Endcall } from '@xipkg/icons';
import { LocalAudioTrack, LocalVideoTrack, Track } from 'livekit-client';
import { supportsScreenSharing } from '@livekit/components-core';
import { TrackToggle } from '../../shared/ui/TrackToggle/TrackToggle';
import { DevicesBar } from '../../shared/ui';

const DisconnectButton = () => {
  const { buttonProps } = useDisconnectButton({});

  return (
    <button
      type="button"
      {...buttonProps}
      className="bg-red-80 hover:bg-red-60 ml-2 flex h-12 w-12 flex-row items-center justify-center rounded-[24px]"
    >
      <Endcall className="fill-gray-100" />
    </button>
  );
};

export const BottomBar = ({ variation, controls, saveUserChoices = true }: ControlBarProps) => {
  const visibleControls = { leave: true, ...controls };

  const localPermissions = useLocalParticipantPermissions();

  if (!localPermissions) {
    visibleControls.camera = false;
    visibleControls.chat = false;
    visibleControls.microphone = false;
    visibleControls.screenShare = false;
  } else {
    visibleControls.camera ??= localPermissions.canPublish;
    visibleControls.microphone ??= localPermissions.canPublish;
    visibleControls.screenShare ??= localPermissions.canPublish;
    visibleControls.chat ??= localPermissions.canPublishData && controls?.chat;
  }
  React.useMemo(() => variation === 'minimal' || variation === 'verbose', [variation]);
  const showText = React.useMemo(
    () => variation === 'textOnly' || variation === 'verbose',
    [variation],
  );
  const { saveAudioInputEnabled, saveVideoInputEnabled } = usePersistentUserChoices({
    preventSave: !saveUserChoices,
  });

  const browserSupportsScreenSharing = supportsScreenSharing();
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);

  const microphoneOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveAudioInputEnabled(enabled) : null,
    [saveAudioInputEnabled],
  );

  const cameraOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveVideoInputEnabled(enabled) : null,
    [saveVideoInputEnabled],
  );
  const onScreenShareChange = React.useCallback(
    (enabled: boolean) => {
      setIsScreenShareEnabled(enabled);
    },
    [setIsScreenShareEnabled],
  );

  const { isMicrophoneEnabled, isCameraEnabled, microphoneTrack, cameraTrack } =
    useLocalParticipant();

  return (
    <div className="w-full">
      <div className="flex w-full flex-row justify-between p-4">
        <div className="flex flex-row gap-4">
          <div className="bg-gray-0 flex w-[96px] items-center justify-center gap-1 rounded-[24px]">
            <DevicesBar
              microTrack={microphoneTrack?.track as LocalAudioTrack}
              microEnabled={isMicrophoneEnabled}
              microTrackToggle={{
                showIcon: false,
                source: Track.Source.Microphone,
                onChange: microphoneOnChange,
              }}
              videoTrack={cameraTrack?.track as unknown as LocalVideoTrack}
              videoEnabled={isCameraEnabled}
              videoTrackToggle={{
                showIcon: false,
                source: Track.Source.Camera,
                onChange: cameraOnChange,
              }}
            />
          </div>
          <div>
            {visibleControls.screenShare && browserSupportsScreenSharing && (
              <TrackToggle
                className="bg-transparent p-0"
                source={Track.Source.ScreenShare}
                captureOptions={{ audio: true, selfBrowserSurface: 'include' }}
                onChange={onScreenShareChange}
              >
                {showText && (isScreenShareEnabled ? 'Stop screen share' : 'Share screen')}
              </TrackToggle>
            )}
          </div>
        </div>
        <div />
        {/* <div className="bg-gray-0 flex h-12
        w-[144px] flex-row items-center justify-center gap-2 rounded-[24px] p-1">
          <ActionButton icon={<Group className="fill-gray-100" />} withBorder={false} />
          <ActionButton icon={<Chat className="fill-gray-100" />} withBorder={false} />
          <ActionButton icon={<Hand className="fill-gray-100" />} withBorder={false} />
        </div> */}
        <DisconnectButton />
      </div>
    </div>
  );
};
