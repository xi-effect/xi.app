/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import type { LocalAudioTrack, LocalVideoTrack } from 'livekit-client';
import { facingModeFromLocalTrack, Track } from 'livekit-client';
import { LocalUserChoices } from '@livekit/components-core';
import {
  ParticipantPlaceholder,
  TrackToggle,
  usePersistentUserChoices,
  usePreviewTracks,
} from '@livekit/components-react';

import { Conference, Microphone } from '@xipkg/icons';

export interface PreJoinProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit' | 'onError'> {
  // eslint-disable-next-line react/no-unused-prop-types
  onSubmit?: (values: LocalUserChoices) => void;
  onValidate?: (values: LocalUserChoices) => boolean;
  onError?: (error: Error) => void;
  defaults?: Partial<LocalUserChoices>;
  debug?: boolean;
  joinLabel?: string;
  micLabel?: string;
  defaultUserChoices?: any;
  camLabel?: string;
  userLabel?: string;
  persistUserChoices?: boolean;
  setUserChoice: (arg: { audioEnabled: boolean; videoEnabled: boolean }) => void;
}

export function PreJoin({
  setUserChoice,
  defaults = {},
  onValidate,
  onError,
  debug,
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  joinLabel = 'Join Room',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  micLabel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  camLabel,
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  userLabel = 'Username',
  persistUserChoices = true,
  defaultUserChoices,
}: PreJoinProps) {
  const [userChoices, setUserChoices] = React.useState(defaultUserChoices);

  const partialDefaults: Partial<LocalUserChoices> = {
    ...(defaults.audioDeviceId !== undefined && { audioDeviceId: defaults.audioDeviceId }),
    ...(defaults.videoDeviceId !== undefined && { videoDeviceId: defaults.videoDeviceId }),
    ...(defaults.audioEnabled !== undefined && { audioEnabled: defaults.audioEnabled }),
    ...(defaults.videoEnabled !== undefined && { videoEnabled: defaults.videoEnabled }),
    ...(defaults.username !== undefined && { username: defaults.username }),
  };

  const {
    userChoices: initialUserChoices,
    saveAudioInputDeviceId,
    saveAudioInputEnabled,
    saveVideoInputDeviceId,
    saveVideoInputEnabled,
    saveUsername,
  } = usePersistentUserChoices({
    defaults: partialDefaults,
    preventSave: !persistUserChoices,
    preventLoad: !persistUserChoices,
  });

  // eslint-disable-next-line max-len
  const [audioEnabled, setAudioEnabled] = React.useState<boolean>(initialUserChoices.audioEnabled);
  // eslint-disable-next-line max-len
  const [videoEnabled, setVideoEnabled] = React.useState<boolean>(initialUserChoices.videoEnabled);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  const [audioDeviceId, setAudioDeviceId] = React.useState<string>(
    initialUserChoices.audioDeviceId,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  const [videoDeviceId, setVideoDeviceId] = React.useState<string>(
    initialUserChoices.videoDeviceId,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  const [username, setUsername] = React.useState(initialUserChoices.username);

  useEffect(() => {
    setUserChoice({ audioEnabled, videoEnabled });
  }, [audioEnabled, videoEnabled]);

  // Save user choices to persistent storage.
  React.useEffect(() => {
    saveAudioInputEnabled(audioEnabled);
  }, [audioEnabled, saveAudioInputEnabled]);
  React.useEffect(() => {
    saveVideoInputEnabled(videoEnabled);
  }, [videoEnabled, saveVideoInputEnabled]);
  React.useEffect(() => {
    saveAudioInputDeviceId(audioDeviceId);
  }, [audioDeviceId, saveAudioInputDeviceId]);
  React.useEffect(() => {
    saveVideoInputDeviceId(videoDeviceId);
  }, [videoDeviceId, saveVideoInputDeviceId]);
  React.useEffect(() => {
    saveUsername(username);
  }, [username, saveUsername]);

  const tracks = usePreviewTracks(
    {
      audio: audioEnabled ? { deviceId: initialUserChoices.audioDeviceId } : false,
      video: videoEnabled ? { deviceId: initialUserChoices.videoDeviceId } : false,
    },
    onError,
  );

  const videoEl = React.useRef(null);

  const videoTrack = React.useMemo(
    () => tracks?.filter((track) => track.kind === Track.Kind.Video)[0] as LocalVideoTrack,
    [tracks],
  );

  const facingMode = React.useMemo(() => {
    if (videoTrack) {
      const { facingMode } = facingModeFromLocalTrack(videoTrack);
      return facingMode;
    }
    return 'undefined';
  }, [videoTrack]);

  const audioTrack = React.useMemo(
    () => tracks?.filter((track) => track.kind === Track.Kind.Audio)[0] as LocalAudioTrack,
    [tracks],
  );

  React.useEffect(() => {
    if (videoEl.current && videoTrack) {
      videoTrack.unmute();
      videoTrack.attach(videoEl.current);
    }

    return () => {
      videoTrack?.detach();
    };
  }, [videoTrack]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isValid, setIsValid] = React.useState<boolean>();

  const handleValidation = React.useCallback(
    (values: LocalUserChoices) => {
      if (typeof onValidate === 'function') {
        return onValidate(values);
      }
      return values.username !== '';
    },
    [onValidate],
  );

  React.useEffect(() => {
    const newUserChoices = {
      username,
      videoEnabled,
      videoDeviceId,
      audioEnabled,
      audioDeviceId,
    };
    setUserChoices(newUserChoices);
    setIsValid(handleValidation(newUserChoices as LocalUserChoices));
  }, [username, videoEnabled, handleValidation, audioEnabled, audioDeviceId, videoDeviceId]);

  return (
    <div>
      <div className="relative">
        <div className="h-full min-w-[737px]">
          {videoTrack && videoEnabled && (
            <div>
              <video className="rounded-[16px]" ref={videoEl} data-lk-facing-mode={facingMode} />
            </div>
          )}
          {(!videoTrack || !videoEnabled) && (
            <div className="flex h-full min-h-[476px] w-full items-center justify-center rounded-[16px] bg-gray-100">
              <ParticipantPlaceholder />
            </div>
          )}
        </div>
        <div className="absolute bottom-5 left-5">
          <div className="flex gap-1 rounded-[24px] bg-gray-100 p-1">
            <div
              className={`border-4 ${audioEnabled && audioTrack ? 'border-green-60' : 'border-red-60'} ml-0.5 flex h-12 w-12 flex-row items-center justify-center rounded-[24px] bg-gray-100`}
            >
              <TrackToggle
                className="bg-transparent text-white"
                initialState={audioEnabled}
                showIcon={false}
                source={Track.Source.Microphone}
                onChange={(enabled) => setAudioEnabled(enabled)}
              >
                <Microphone width={25} className="fill-red-0" />
              </TrackToggle>
            </div>
            <div
              className={`border-4 ${videoEnabled ? 'border-green-60' : 'border-red-60'} ml-0.5 flex h-12 w-12 flex-row items-center justify-center rounded-[24px] bg-gray-100`}
            >
              <TrackToggle
                showIcon={false}
                className="bg-transparent text-white"
                initialState={videoEnabled}
                source={Track.Source.Camera}
                onChange={(enabled) => setVideoEnabled(enabled)}
              >
                <Conference width={214} className="fill-red-0" />
              </TrackToggle>
            </div>
          </div>
        </div>
      </div>
      {debug && (
        <>
          <strong>User Choices:</strong>
          <ul className="lk-list" style={{ overflow: 'hidden', maxWidth: '15rem' }}>
            <li>Username: {`${userChoices.username}`}</li>
            <li>Video Enabled: {`${userChoices.videoEnabled}`}</li>
            <li>Audio Enabled: {`${userChoices.audioEnabled}`}</li>
            <li>Video Device: {`${userChoices.videoDeviceId}`}</li>
            <li>Audio Device: {`${userChoices.audioDeviceId}`}</li>
          </ul>
        </>
      )}
    </div>
  );
}
