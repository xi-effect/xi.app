import '@livekit/components-styles';
import * as React from 'react';
import type { Participant, TrackPublication } from 'livekit-client';
import { Track } from 'livekit-client';
import type { ParticipantClickEvent, TrackReferenceOrPlaceholder } from '@livekit/components-core';
import { isTrackReference, isTrackReferencePinned } from '@livekit/components-core';
import { AudioTrack, ConnectionQualityIndicator, FocusToggle, LockLockedIcon , ParticipantContext, ParticipantContextIfNeeded,  ParticipantName,  ParticipantPlaceholder, ParticipantTileProps, ScreenShareIcon, TrackMutedIndicator, TrackRefContext, VideoTrack, useEnsureParticipant, useFeatureContext, useIsEncrypted, useIsSpeaking, useMaybeLayoutContext, useMaybeParticipantContext, useMaybeTrackRefContext, useParticipantTile } from '@livekit/components-react';
// import {ParticipantName} from './ParticipantName'

function TrackRefContextIfNeeded(
  props: React.PropsWithChildren<{
    trackRef?: TrackReferenceOrPlaceholder;
  }>,
) {
  const hasContext = !!useMaybeTrackRefContext();
  return props.trackRef && !hasContext ? (
    <TrackRefContext.Provider value={props.trackRef}>{props.children}</TrackRefContext.Provider>
  ) : (
    <>{props.children}</>
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
  const trackReference: TrackReferenceOrPlaceholder = React.useMemo(() => {
    return {
      participant: trackRef?.participant ?? maybeTrackRef?.participant ?? p,
      source: trackRef?.source ?? maybeTrackRef?.source ?? source,
      publication: trackRef?.publication ?? maybeTrackRef?.publication ?? publication,
    };
  }, [maybeTrackRef, p, publication, source, trackRef]);

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
    <div style={{ position: 'relative' }} {...elementProps}>
      <TrackRefContextIfNeeded trackRef={trackReference}>
        <ParticipantContextIfNeeded participant={trackReference.participant}>
          <div className={`${isSpeaking ? 'border-4 border-green-60' : '' } rounded-[8px] h-full`}>
          {children ?? (
            <>
              {isTrackReference(trackReference) &&
              (trackReference.publication?.kind === 'video' ||
                trackReference.source === Track.Source.Camera ||
                trackReference.source === Track.Source.ScreenShare) ? (
                <VideoTrack
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
                {/* **** */}
              </div>
              <div className="lk-participant-metadata p-1">
                <div className=" bg-transperent">
                  {trackReference.source === Track.Source.Camera ? (
                    <div className='flex gap-[6px] items-center bg-gray-100 py-[4px] px-[8px] rounded-[4px]'>
                      {isEncrypted && <LockLockedIcon style={{ background : 'transperent' }} />}
                      <TrackMutedIndicator
                        source={Track.Source.Microphone}
                        show={'muted'}
                        style={{ marginRight: '0.25rem' , background : 'transperent' }}
                      ></TrackMutedIndicator>
                      <ParticipantName />
                    </div>
                  ) : (
                    <div className='flex gap-[6px] items-center bg-gray-100 py-[4px] px-[8px] rounded-[4px]'>
                      <ScreenShareIcon style={{ marginRight: '0.25rem' }} />
                      <ParticipantName>&apos;s screen</ParticipantName>
                    </div>
                  )}
                </div>
                <ConnectionQualityIndicator className="bg-transperent" />
              </div>
            </>
          )}
          </div>
          <FocusToggle style={{background : "transparent", padding : '5px'}} trackRef={trackReference} />
        </ParticipantContextIfNeeded>
      </TrackRefContextIfNeeded>
    </div>
  );
}
