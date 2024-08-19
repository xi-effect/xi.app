/* eslint-disable react/jsx-indent */
import React from 'react';
import { Participant, Track } from 'livekit-client';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import { isTrackReference, isTrackReferencePinned } from '@livekit/components-core';
import {
  AudioTrack,
  ConnectionQualityIndicator,
  LockLockedIcon,
  ParticipantContextIfNeeded,
  ParticipantName,
  ParticipantPlaceholder,
  ParticipantTileProps,
  ScreenShareIcon,
  TrackMutedIndicatorProps,
  TrackRefContext,
  VideoTrack,
  useEnsureParticipant,
  useFeatureContext,
  useIsEncrypted,
  useMaybeLayoutContext,
  useMaybeTrackRefContext,
  useParticipantTile,
  useTrackMutedIndicator,
} from '@livekit/components-react';
import { MicrophoneOff, RedLine } from '@xipkg/icons';
import { FocusToggle } from './FocusToggle';
import '../utility/style.css';

type TrackRefContextIfNeededPropsT = {
  trackRef?: TrackReferenceOrPlaceholder;
  children?: React.ReactNode;
};

const TrackRefContextIfNeeded = ({ trackRef, children }: TrackRefContextIfNeededPropsT) => {
  const hasContext = !!useMaybeTrackRefContext();
  return trackRef && !hasContext ? (
    <TrackRefContext.Provider value={trackRef}>{children}</TrackRefContext.Provider>
  ) : (
    children
  );
};

export const TrackMutedIndicator = ({
  trackRef,
  show = 'always',
  ...props
}: TrackMutedIndicatorProps) => {
  const { isMuted } = useTrackMutedIndicator(trackRef);

  const showIndicator =
    show === 'always' || (show === 'muted' && isMuted) || (show === 'unmuted' && !isMuted);

  if (!showIndicator) {
    return null;
  }

  return (
    <div data-lk-muted={isMuted}>
      {(props.children ?? isMuted) ? (
        <div className="relative w-[12px]">
          <MicrophoneOff className="fill-gray-0 absolute h-[16px] w-[16px]" />
          <RedLine className="fill-red-80 absolute h-[16px] w-[16px]" />
        </div>
      ) : null}
    </div>
  );
};

type FocusToggleDisablePropsT = {
  isFocusToggleDisable?: boolean;
};

type ParticipantTilePropsT = ParticipantTileProps &
  FocusToggleDisablePropsT & {
    participant?: Participant;
    source?: Track.Source;
    publication?: any;
  };

export const ParticipantTile = ({
  trackRef,
  participant,
  children,
  source = Track.Source.Camera,
  onParticipantClick,
  publication,
  disableSpeakingIndicator,
  isFocusToggleDisable,
  ...htmlProps
}: ParticipantTilePropsT) => {
  const maybeTrackRef = useMaybeTrackRefContext();
  const p = useEnsureParticipant(participant);
  const trackReference: TrackReferenceOrPlaceholder = React.useMemo(
    () => ({
      participant: trackRef?.participant ?? maybeTrackRef?.participant ?? p,
      source: trackRef?.source ?? maybeTrackRef?.source ?? source,
      publication: trackRef?.publication ?? maybeTrackRef?.publication ?? publication,
    }),
    [maybeTrackRef, p, publication, source, trackRef],
  );

  const { elementProps } = useParticipantTile<HTMLDivElement>({
    htmlProps,
    disableSpeakingIndicator,
    onParticipantClick,
    trackRef: trackReference,
  });
  const isEncrypted = useIsEncrypted(p);
  const layoutContext = useMaybeLayoutContext();

  const autoManageSubscription = useFeatureContext()?.autoSubscription;

  const handleSubscribe = React.useCallback(
    (subscribed: boolean) => {
      if (
        trackReference.source &&
        !subscribed &&
        layoutContext &&
        layoutContext.pin.dispatch &&
        isTrackReferencePinned(trackReference, layoutContext.pin.state)
      ) {
        layoutContext.pin.dispatch({ msg: 'clear_pin' });
      }
    },
    [trackReference, layoutContext],
  );

  return (
    <div
      style={{
        position: 'relative',
      }}
      {...elementProps}
    >
      <TrackRefContextIfNeeded trackRef={trackReference}>
        <ParticipantContextIfNeeded participant={trackReference.participant}>
          <div className="h-full">
            {children ?? (
              <div className="h-full">
                {isTrackReference(trackReference) &&
                (trackReference.publication?.kind === 'video' ||
                  trackReference.source === Track.Source.Camera ||
                  trackReference.source === Track.Source.ScreenShare) ? (
                  <VideoTrack
                    className="rounded-[8px]"
                    style={{
                      ...(trackReference.source === Track.Source.Camera && {
                        transform: 'rotateY(180deg)',
                      }),
                      boxSizing: 'border-box',
                      background: 'black',
                    }}
                    trackRef={trackReference}
                    onSubscriptionStatusChanged={handleSubscribe}
                    manageSubscription={autoManageSubscription}
                  />
                ) : (
                  isTrackReference(trackReference) && (
                    <AudioTrack
                      trackRef={trackReference}
                      onSubscriptionStatusChanged={handleSubscribe}
                    />
                  )
                )}
                <div
                  style={{
                    background: 'black',
                    borderRadius: '8px',
                    height: '100%',
                  }}
                  className="lk-participant-placeholder flex justify-center"
                >
                  <ParticipantPlaceholder />
                </div>
                <div className="lk-participant-metadata p-1">
                  <div className="bg-transperent">
                    {trackReference.source === Track.Source.Camera ? (
                      <div className="flex h-[24px] w-full gap-[6px] rounded-[4px] bg-gray-100 px-[6px] py-[4px]">
                        {isEncrypted && <LockLockedIcon style={{ background: 'transperent' }} />}
                        <TrackMutedIndicator
                          trackRef={{
                            participant: trackReference.participant,
                            source: Track.Source.Microphone,
                          }}
                          show="muted"
                          style={{ marginRight: '0.45rem', background: 'transperent' }}
                        />
                        <ParticipantName className="text-[12px]" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-[6px] rounded-[4px] bg-gray-100 px-[8px] py-[4px]">
                        <ScreenShareIcon style={{ marginRight: '0.25rem' }} />
                        <ParticipantName>&apos;s screen</ParticipantName>
                      </div>
                    )}
                  </div>
                  <ConnectionQualityIndicator className="bg-transperent" />
                </div>
              </div>
            )}
          </div>
          {isFocusToggleDisable ? null : (
            <FocusToggle
              style={{ background: 'transparent', padding: '5px' }}
              trackRef={trackReference}
            />
          )}
        </ParticipantContextIfNeeded>
      </TrackRefContextIfNeeded>
    </div>
  );
};
