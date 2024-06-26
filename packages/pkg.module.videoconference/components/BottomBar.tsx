'use client';

import React from 'react';
import {
  ControlBarProps,
  useDisconnectButton,
  useLocalParticipantPermissions,
  usePersistentUserChoices,
} from '@livekit/components-react';
import { Chat, Endcall, Group, Hand } from '@xipkg/icons';
import { Track } from 'livekit-client';
import { supportsScreenSharing } from '@livekit/components-core';
import { TrackToggle } from '../utility/TrackToggle';
import { ActionButton } from './ActionButton';

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
  return (
    <div className="w-full">
      <div className="flex w-full flex-row justify-between p-4">
        <div className="flex flex-row gap-4">
          <div className="flex gap-1">
            <div>
              <TrackToggle source={Track.Source.Microphone} onChange={microphoneOnChange}>
                {showText && 'Microphone'}
              </TrackToggle>
            </div>
            {visibleControls.camera && (
              <div>
                <TrackToggle source={Track.Source.Camera} onChange={cameraOnChange}>
                  {showText && 'Camera'}
                </TrackToggle>
              </div>
            )}
          </div>
          <div>
            {visibleControls.screenShare && browserSupportsScreenSharing && (
              <TrackToggle
                source={Track.Source.ScreenShare}
                captureOptions={{ audio: true, selfBrowserSurface: 'include' }}
                onChange={onScreenShareChange}
              >
                {showText && (isScreenShareEnabled ? 'Stop screen share' : 'Share screen')}
              </TrackToggle>
            )}
          </div>
        </div>

        <div className="flex h-12 w-[144px] flex-row items-center justify-center gap-2 rounded-[24px] bg-gray-100 p-1">
          <ActionButton icon={<Group className="fill-red-0" />} withBorder={false} />
          <ActionButton icon={<Chat className="fill-red-0" />} withBorder={false} />
          <ActionButton icon={<Hand className="fill-red-0" />} withBorder={false} />
        </div>
        <DisconnectButton />
      </div>
    </div>
  );
};
