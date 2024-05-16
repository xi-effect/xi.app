/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-useless-fragment */
// import '@livekit/components-styles';
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
  TrackMutedIndicator,
  TrackRefContext,
  VideoTrack,
  useEnsureParticipant,
  useFeatureContext,
  useIsEncrypted,
  useIsSpeaking,
  useMaybeLayoutContext,
  useMaybeTrackRefContext,
  useParticipantTile,
} from '@livekit/components-react';

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
  // TODO: remove deprecated props and refactor in a future version.
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
    <div style={{ position: 'relative', flexDirection: 'unset' }} {...elementProps}>
      <TrackRefContextIfNeeded trackRef={trackReference}>
        <ParticipantContextIfNeeded participant={trackReference.participant}>
          <div>
            {children ?? (
              <div
                className={`${isSpeaking ? 'border-green-60 border-4' : ''} h-full rounded-[8px]`}
              >
                {isTrackReference(trackReference) &&
                (trackReference.publication?.kind === 'video' ||
                  trackReference.source === Track.Source.Camera ||
                  trackReference.source === Track.Source.ScreenShare) ? (
                  <VideoTrack
                    style={
                      trackReference.source === Track.Source.Camera
                        ? { transform: 'rotateY(180deg)' }
                        : undefined
                    }
                    className="rounded-[8px]"
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
                <div className="lk-participant-placeholder h-fit">
                  <ParticipantPlaceholder />
                </div>
                <div className="lk-participant-metadata p-1">
                  <div className=" bg-transperent">
                    {trackReference.source === Track.Source.Camera ? (
                      <div className="flex items-center gap-[6px] rounded-[4px] bg-gray-100 px-[8px] py-[4px]">
                        {isEncrypted && <LockLockedIcon style={{ background: 'transperent' }} />}
                        <TrackMutedIndicator
                          source={Track.Source.Microphone}
                          show="muted"
                          style={{ marginRight: '0.25rem', background: 'transperent' }}
                        />
                        <ParticipantName />
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
