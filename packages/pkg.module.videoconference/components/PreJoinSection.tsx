/* eslint-disable jsx-a11y/media-has-caption */
import type {
  CreateLocalTracksOptions,
  LocalAudioTrack,
  LocalTrack,
  LocalVideoTrack,
} from 'livekit-client';
import {
  createLocalTracks,
  facingModeFromLocalTrack,
  Track,
  Mutex,
} from 'livekit-client';
import * as React from 'react';
import { ParticipantPlaceholder, TrackToggle, usePersistentUserChoices } from '@livekit/components-react';
import type { LocalUserChoices } from '@livekit/components-core';
import { log, defaultUserChoices } from '@livekit/components-core';
import { Button } from '@xipkg/button';
import { Conference, Microphone } from '@xipkg/icons';
import { MediaDeviceMenu } from './MediaDeviceMenu';
import { MessageBeforeJoin } from './MessageBeforeJoin';

/**
 * Props for the PreJoin component.
 * @public
 */
export type PreJoinPropsT = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit' | 'onError'> & {
  connect?: boolean;
  /** This function is called with the `LocalUserChoices` if validation is passed. */
  onSubmit?: (values: LocalUserChoices) => void;
  /**
   * Provide your
   * custom validation function.
   * Only if validation is successful the user choices are past to the onSubmit callback.
   */
  onValidate?: (values: LocalUserChoices) => boolean;
  onError?: (error: Error) => void;
  /** Prefill the input form with initial values. */
  defaults?: Partial<LocalUserChoices>;
  /** Display a debug window for your convenience. */
  username?: string;
  /**
   * If true, user choices are persisted across sessions.
   * @defaultValue true
   * @alpha
   */
  persistUserChoices?: boolean;
};

/** @alpha */
export const usePreviewTracks = (
  options: CreateLocalTracksOptions,
  onError?: (err: Error) => void,
) => {
  const [tracks, setTracks] = React.useState<LocalTrack[]>();

  const trackLock = React.useMemo(() => new Mutex(), []);

  React.useEffect(() => {
    let needsCleanup = false;
    let localTracks: Array<LocalTrack> = [];
    trackLock.lock().then(async (unlock) => {
      try {
        if (options.audio || options.video) {
          localTracks = await createLocalTracks(options);

          if (needsCleanup) {
            localTracks.forEach((tr) => tr.stop());
          } else {
            setTracks(localTracks);
          }
        }
      } catch (e: unknown) {
        if (onError && e instanceof Error) {
          onError(e);
        } else {
          log.error(e);
        }
      } finally {
        unlock();
      }
    });

    return () => {
      needsCleanup = true;
      localTracks.forEach((track) => {
        track.stop();
      });
    };
  }, [JSON.stringify(options), onError, trackLock]);

  return tracks;
};

/**
 * The `PreJoin` prefab component is normally presented to the user before he enters a room.
 * This component allows the user to check and select
 * the preferred media device (camera und microphone).
 * On submit the user decisions are returned,
 * which can then be passed on to the `LiveKitRoom`
 * so that the user enters the room with the correct media devices.
 *
 * @remarks
 * This component is independent of the `LiveKitRoom` component and should not be nested within it.
 * Because it only access the local media tracks this
 * component is self contained and works without connection to the LiveKit server.
 *
 * @example
 * ```tsx
 * <PreJoin />
 * ```
 * @public
 */
export const PreJoin = ({
  defaults = {},
  onValidate,
  onSubmit,
  onError,
  connect = false,
  username = 'username',
  persistUserChoices = true,
}: PreJoinPropsT) => {
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
  } = usePersistentUserChoices({
    defaults: partialDefaults,
    preventSave: !persistUserChoices,
    preventLoad: !persistUserChoices,
  });

  const [permissionByBrowser, setPermissionByBrowser] = React.useState<boolean>(true);
  // Initialize device settings
  const [audioEnabled, setAudioEnabled] = React.useState<boolean>(initialUserChoices.audioEnabled);
  const [videoEnabled, setVideoEnabled] = React.useState<boolean>(initialUserChoices.videoEnabled);
  const [audioDeviceId, setAudioDeviceId] = React.useState<string>(
    initialUserChoices.audioDeviceId,
  );
  const [videoDeviceId, setVideoDeviceId] = React.useState<string>(
    initialUserChoices.videoDeviceId,
  );

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
  }, [username, videoEnabled, handleValidation, audioEnabled, audioDeviceId, videoDeviceId]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (handleValidation(userChoices)) {
      if (typeof onSubmit === 'function') {
        onSubmit(userChoices);
      }
    } else {
      log.warn('Validation failed with: ', userChoices);
    }
  };

  React.useEffect(() => {
    setPermissionByBrowser(true);
  }, [audioEnabled || videoEnabled]);

  return (
    <div className="mt-4">
      <h2 className="mb-8 font-sans text-[32px] font-medium">Присоединиться к конференции</h2>
      <div className="mr-8 grid grid-cols-2 gap-2">
        <div className="relative flex aspect-video h-full w-full items-center justify-center overflow-hidden rounded-[16px] bg-gray-100">
          <div className="relative">
            {videoTrack && videoEnabled && (
              <div className="aspect-video h-full w-full [transform:rotateY(180deg)]">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  ref={videoEl}
                  data-lk-facing-mode={facingMode}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            {(!videoTrack || !videoEnabled) && (
              <div className="flex items-center justify-center rounded-[16px] bg-gray-100">
                <ParticipantPlaceholder />
              </div>
            )}
          </div>
          <div className="absolute bottom-5 left-5">
            <div className="flex gap-1 rounded-[24px] bg-gray-100 p-1">
              <div
                className={`border-2 ${audioEnabled && audioTrack ? 'border-green-60' : 'border-red-60'} ml-0.5 flex h-12 w-12 flex-row items-center justify-center rounded-[24px] bg-gray-100`}
              >
                <TrackToggle
                  className="bg-transparent text-gray-0"
                  initialState={audioEnabled}
                  showIcon={false}
                  source={Track.Source.Microphone}
                  onChange={(enabled) => permissionByBrowser && setAudioEnabled(enabled)}
                >
                  <Microphone width={25} className="fill-red-0" />
                </TrackToggle>
              </div>
              <div
                className={`border-2 ${videoEnabled && videoTrack ? 'border-green-60' : 'border-red-60'} ml-0.5 flex h-12 w-12 flex-row items-center justify-center rounded-[24px] bg-gray-100`}
              >
                <TrackToggle
                  showIcon={false}
                  className="bg-transparent text-gray-0"
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
        <div className="border-gray-30 flex flex-col justify-between rounded-[16px] border p-5">
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
                  initialSelection={audioDeviceId || undefined}
                  warnDisable={!permissionByBrowser}
                  kind="audiooutput"
                  onActiveDeviceChange={(_, id) => setAudioDeviceId(id)}
                />
              </div>
            </div>
          </div>
          <Button onClick={(event) => handleSubmit(event)} className="w-full">
            Присоединиться
          </Button>
        </div>
      </div>
    </div>
  );
};
