/* eslint-disable no-undef */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Track } from 'livekit-client';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import { isTrackReference, isTrackReferencePinned } from '@livekit/components-core';
import {
  AudioTrack,
  ConnectionQualityIndicator,
  FocusToggle,
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
  useIsSpeaking,
  useMaybeLayoutContext,
  useMaybeTrackRefContext,
  useParticipantTile,
  useTrackMutedIndicator,
} from '@livekit/components-react';
import { MicrophoneOff, RedLine } from '@xipkg/icons';

function TrackRefContextIfNeeded({
  trackRef,
  children,
}: {
  trackRef?: TrackReferenceOrPlaceholder;
  children?: React.ReactNode;
}) {
  const hasContext = !!useMaybeTrackRefContext();
  return trackRef && !hasContext ? (
    <TrackRefContext.Provider value={trackRef}>{children}</TrackRefContext.Provider>
  ) : (
    <>{children}</>
  );
}
export function TrackMutedIndicator({
  trackRef,
  show = 'always',
  ...props
}: TrackMutedIndicatorProps) {
  const { isMuted } = useTrackMutedIndicator(trackRef);

  const showIndicator =
    show === 'always' || (show === 'muted' && isMuted) || (show === 'unmuted' && !isMuted);

  if (!showIndicator) {
    return null;
  }

  return (
    <div data-lk-muted={isMuted}>
      {props.children ?? isMuted ? (
        <div className="relative w-[12px]">
          <MicrophoneOff className="absolute h-[16px] w-[16px] fill-white" />
          <RedLine className="fill-red-80 absolute h-[16px] w-[16px]" />
        </div>
      ) : null}
    </div>
  );
}

export function ParticipantTile({
  trackRef,
  participant,
  children,
  source = Track.Source.Camera,
  onParticipantClick,
  publication,
  disableSpeakingIndicator,
  ...htmlProps
}: ParticipantTileProps) {
  const maybeTrackRef = useMaybeTrackRefContext();
  const p = useEnsureParticipant(participant);
  const isSpeaking = useIsSpeaking(participant);
  const trackReference: TrackReferenceOrPlaceholder = React.useMemo(
    () => ({
      participant: trackRef?.participant ?? maybeTrackRef?.participant ?? p,
      source: trackRef?.source ?? maybeTrackRef?.source ?? source,
      publication: trackRef?.publication ?? maybeTrackRef?.publication ?? publication,
    }),
    [maybeTrackRef, p, publication, source, trackRef],
  );

  const { elementProps } = useParticipantTile<HTMLDivElement>({
    participant: trackReference.participant,
    htmlProps,
    source: trackReference.source,
    publication: trackReference.publication,
    disableSpeakingIndicator,
    onParticipantClick,
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
        flexDirection: 'unset',
      }}
      {...elementProps}
    >
      <TrackRefContextIfNeeded trackRef={trackReference}>
        <ParticipantContextIfNeeded participant={trackReference.participant}>
          <div className="h-full">
            {children ?? (
              <div className="h-full rounded-[8px]">
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
                      ...(isSpeaking && { border: '3px solid #419B58' }),
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
                <div className="lk-participant-placeholder h-full">
                  <ParticipantPlaceholder />
                </div>
                <div className="lk-participant-metadata p-1">
                  <div className=" bg-transperent">
                    {trackReference.source === Track.Source.Camera ? (
                      <div className="flex h-[24px] w-full gap-[6px] rounded-[4px] bg-gray-100 px-[6px] py-[4px]">
                        {isEncrypted && <LockLockedIcon style={{ background: 'transperent' }} />}
                        <TrackMutedIndicator
                          trackRef={{
                            participant: trackReference.participant,
                            source: Track.Source.Microphone,
                          }}
                          source={Track.Source.Microphone}
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
          <FocusToggle
            style={{ background: 'transparent', padding: '5px' }}
            trackRef={trackReference}
          />
        </ParticipantContextIfNeeded>
      </TrackRefContextIfNeeded>
    </div>
  );
}
