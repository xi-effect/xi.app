/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import '@livekit/components-styles';
import type { TrackReferenceOrPlaceholder, WidgetState } from '@livekit/components-core';
import { isEqualTrackRef, isTrackReference, isWeb, log } from '@livekit/components-core';
import { RoomEvent, Track } from 'livekit-client';
import {
  ConnectionStateToast,
  LayoutContextProvider,
  RoomAudioRenderer,
  VideoConferenceProps,
  useCreateLayoutContext,
  usePinnedTracks,
  useTracks,
} from '@livekit/components-react';
import { ParticipantTile } from './ParticipantTile';
import {
  FocusLayout,
  CarouselLayout,
  GridLayout,
  FocusLayoutContainer,
} from './VideoConferenceLayout';

export function VideoConference({
  chatMessageFormatter,
  chatMessageDecoder,
  chatMessageEncoder,
  ...props
}: VideoConferenceProps) {
  const [widgetState, setWidgetState] = React.useState<WidgetState>({
    showChat: false,
    unreadMessages: 0,
  });
  const lastAutoFocusedScreenShareTrack = React.useRef<TrackReferenceOrPlaceholder | null>(null);

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false },
  );

  const widgetUpdate = (state: WidgetState) => {
    log.debug('updating widget state', state);
    setWidgetState(state);
  };

  const layoutContext = useCreateLayoutContext();

  const screenShareTracks = tracks
    .filter(isTrackReference)
    .filter((track) => track.publication.source === Track.Source.ScreenShare);

  const focusTrack = usePinnedTracks(layoutContext)?.[0];
  const carouselTracks = tracks.filter((track) => !isEqualTrackRef(track, focusTrack));

  React.useEffect(() => {
    if (
      screenShareTracks.some((track) => track.publication.isSubscribed) &&
      lastAutoFocusedScreenShareTrack.current === null
    ) {
      log.debug('Auto set screen share focus:', { newScreenShareTrack: screenShareTracks[0] });
      layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: screenShareTracks[0] });
      lastAutoFocusedScreenShareTrack.current = screenShareTracks[0];
    } else if (
      lastAutoFocusedScreenShareTrack.current &&
      !screenShareTracks.some(
        (track) =>
          track.publication.trackSid ===
          lastAutoFocusedScreenShareTrack.current?.publication?.trackSid,
      )
    ) {
      log.debug('Auto clearing screen share focus.');
      layoutContext.pin.dispatch?.({ msg: 'clear_pin' });
      lastAutoFocusedScreenShareTrack.current = null;
    }
  }, [
    screenShareTracks
      .map((ref) => `${ref.publication.trackSid}_${ref.publication.isSubscribed}`)
      .join(),
    focusTrack?.publication?.trackSid,
  ]);

  return (
    <div className="lk-video-conference" {...props}>
      {isWeb() && (
        <LayoutContextProvider
          value={layoutContext}
          // onPinChange={handleFocusStateChange}
          onWidgetChange={widgetUpdate}
        >
          <div className="lk-video-conference-inner">
            <div>
              {!focusTrack ? (
                <div className="min-h-[79vh]">
                  <GridLayout tracks={tracks}>
                    <ParticipantTile
                      style={{ flexDirection: 'column', maxWidth: '800px', maxHeight: '450px' }}
                    />
                  </GridLayout>
                </div>
              ) : (
                <FocusLayoutContainer className="flex min-h-screen flex-col">
                  <div className="flex min-h-[79vh] flex-grow flex-col justify-between gap-4">
                    <CarouselLayout
                      orientation="horizontal"
                      userTracks={tracks}
                      tracks={carouselTracks}
                    >
                      <ParticipantTile style={{ flex: 'unset' }} className="h-[144px] w-[250px]" />
                    </CarouselLayout>
                    {focusTrack && <FocusLayout trackRef={focusTrack} />}
                  </div>
                </FocusLayoutContainer>
              )}
            </div>
          </div>
        </LayoutContextProvider>
      )}
      <RoomAudioRenderer />
      <ConnectionStateToast />
    </div>
  );
}
