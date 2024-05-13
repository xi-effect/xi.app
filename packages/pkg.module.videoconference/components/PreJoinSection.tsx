/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@xipkg/button';
import { LocalUserChoices, TrackReference } from '@livekit/components-core';
import React, { useEffect } from 'react';
import type { LocalAudioTrack, LocalVideoTrack } from 'livekit-client';
import { facingModeFromLocalTrack, Track } from 'livekit-client';
import {
  useMediaDeviceSelect,
  ParticipantPlaceholder,
  TrackToggle,
  usePersistentUserChoices,
  usePreviewTracks,
  useTracks,
  useMaybeRoomContext,
} from '@livekit/components-react';
import { Conference, Microphone } from '@xipkg/icons';
import { MediaDeviceMenu } from './MediaDeviceMenu';
import { MessageBeforeJoin } from './MessageBeforeJoin';

export interface PreJoinProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit' | 'onError'> {
  onValidate?: (values: LocalUserChoices) => boolean;
  defaults?: Partial<LocalUserChoices>;
  defaultUserChoices?: any;
  persistUserChoices?: boolean;
}

interface IPreJoinSection {
  connect: boolean;
  setConnect: (arg: (prev: boolean) => boolean) => void;
  setUserChoice: (arg: { audioEnabled: boolean; videoEnabled: boolean }) => void | undefined;
}

export function PreJoinSection({
  defaults = {},
  onValidate,
  persistUserChoices = true,
  defaultUserChoices,
  setConnect,
  connect,
  setUserChoice,
}: IPreJoinSection & PreJoinProps) {
  const dinamicControl = useMediaDeviceSelect({
    kind: 'audiooutput',
  });

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
  const [permissionByBrowser, setPermissionByBrowser] = React.useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = React.useState<boolean>(initialUserChoices.audioEnabled);
  const [videoEnabled, setVideoEnabled] = React.useState<boolean>(initialUserChoices.videoEnabled);
  const [audioDeviceId, setAudioDeviceId] = React.useState<string>(
    initialUserChoices.audioDeviceId,
  );
  const [videoDeviceId, setVideoDeviceId] = React.useState<string>(
    initialUserChoices.videoDeviceId,
  );
  const [username, setUsername] = React.useState(initialUserChoices.username);

  useEffect(() => {
    setUserChoice({ audioEnabled, videoEnabled });
  }, [audioEnabled, videoEnabled]);

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

  const onError = () => {
    setPermissionByBrowser(false);
  };

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

  // const trackAudioReferences: TrackReference[] = useTracks([Track.Source.Microphone]);
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

  useEffect(() => {
    setPermissionByBrowser(true);
  }, [audioEnabled || videoEnabled]);

  return (
    <div className="mt-4">
      <h2 className="mb-8 font-sans text-[32px] font-medium">Присоединиться к конференции</h2>
      <div className="flex w-full gap-6">
        <div className="relative">
          <div className="h-[476px] w-[847px] rounded-[16px]">
            {videoTrack && videoEnabled && (
              <div className="aspect-video h-[476px] [transform:rotateY(180deg)]">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video className="rounded-[16px]" ref={videoEl} data-lk-facing-mode={facingMode} />
              </div>
            )}
            {(!videoTrack || !videoEnabled) && (
              <div className="flex h-[476px] items-center justify-center rounded-[16px] bg-gray-100">
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
                  onChange={(enabled) => permissionByBrowser && setAudioEnabled(enabled)}
                >
                  <Microphone width={25} className="fill-red-0" />
                </TrackToggle>
              </div>
              <div
                className={`border-4 ${videoEnabled && videoTrack ? 'border-green-60' : 'border-red-60'} ml-0.5 flex h-12 w-12 flex-row items-center justify-center rounded-[24px] bg-gray-100`}
              >
                <TrackToggle
                  showIcon={false}
                  className="bg-transparent text-white"
                  initialState={videoEnabled}
                  source={Track.Source.Camera}
                  onChange={(enabled) => permissionByBrowser && setVideoEnabled(enabled)}
                >
                  <Conference width={214} className="fill-red-0" />
                </TrackToggle>
              </div>
            </div>
          </div>
        </div>
        <div className="border-gray-30 flex w-[737px] flex-col justify-between rounded-[16px] border p-5">
          <div>
            {/* eslint-disable-next-line no-nested-ternary */}
            {!permissionByBrowser ? (
              <MessageBeforeJoin typeOfMessage="needPermission" />
            ) : !connect ? (
              <MessageBeforeJoin typeOfMessage="notStarted" />
            ) : null}
            <div className="mb-8">
              <h2 className="mb-1 font-sans">Камера</h2>
              <MediaDeviceMenu
                disabled={!videoEnabled}
                initialSelection={videoDeviceId || undefined}
                warnDisable={!permissionByBrowser}
                kind="videoinput"
                onActiveDeviceChange={(_, id) => setVideoDeviceId(id)}
              />
            </div>
            <div className="my-4">
              <h2 className="mb-1 font-sans">Звук</h2>
              <div className="flex flex-col gap-2">
                <MediaDeviceMenu
                  disabled={!audioEnabled}
                  initialSelection={audioDeviceId || undefined}
                  warnDisable={!permissionByBrowser}
                  kind="audioinput"
                  onActiveDeviceChange={(_, id) => setAudioDeviceId(id)}
                />
                <MediaDeviceMenu
                  disabled={!audioEnabled}
                  initialSelection={dinamicControl.activeDeviceId || undefined}
                  warnDisable={!permissionByBrowser}
                  kind="audiooutput"
                  onActiveDeviceChange={(_, id) => setAudioDeviceId(id)}
                />
              </div>
            </div>
          </div>
          <Button onClick={() => setConnect((prev) => !prev)} className="w-full">
            Присоединиться
          </Button>
        </div>
      </div>
    </div>
  );
}
