import React from 'react';
import '@livekit/components-styles';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ParticipantTile } from '../../entities/Participant';
import { CarouselContainer, GridLayout, FocusLayoutContainer } from './VideoGridLayout';

export const VideoGrid = ({ ...props }: VideoConferenceProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  // const [widgetState, setWidgetState] = React.useState<WidgetState>({
  //   showChat: false,
  //   unreadMessages: 0,
  // });

  const lastAutoFocusedScreenShareTrack = React.useRef<TrackReferenceOrPlaceholder | null>(null);

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false },
  );

  // const widgetUpdate = (state: WidgetState) => {
  //   log.debug('updating widget state', state);
  //   setWidgetState(state);
  // };

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
      // eslint-disable-next-line prefer-destructuring
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
    if (focusTrack && !isTrackReference(focusTrack)) {
      const updatedFocusTrack = tracks.find(
        (tr) =>
          tr.participant.identity === focusTrack.participant.identity &&
          tr.source === focusTrack.source,
      );
      if (updatedFocusTrack !== focusTrack && isTrackReference(updatedFocusTrack)) {
        layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: updatedFocusTrack });
      }
    }
  }, [
    screenShareTracks
      .map((ref) => `${ref.publication.trackSid}_${ref.publication.isSubscribed}`)
      .join(),
    focusTrack?.publication?.trackSid,
    tracks,
  ]);

  React.useEffect(() => {
    const carouselType = searchParams.get('carouselType');
    if (carouselType === 'horizontal' || carouselType === 'vertical') {
      const params = new URLSearchParams(searchParams.toString());
      params.set('carouselType', carouselType);
      layoutContext.pin.dispatch?.({
        msg: 'set_pin',
        trackReference: lastAutoFocusedScreenShareTrack.current ? screenShareTracks[0] : tracks[0],
      });
      router.push(`${pathname}?${params.toString()}`);
    } else if (!carouselType) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('carouselType');
      layoutContext.pin.dispatch?.({ msg: 'clear_pin' });
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [router, pathname, searchParams]);

  return (
    <div className="lk-video-conference" {...props}>
      {isWeb() && (
        <LayoutContextProvider value={layoutContext}>
          <div className="lk-video-conference-inner">
            {!focusTrack ? (
              <div className="min-h-sreen">
                <GridLayout tracks={tracks}>
                  <ParticipantTile
                    isFocusToggleDisable
                    style={{ flexDirection: 'column', maxWidth: '100%', maxHeight: '100%' }}
                  />
                </GridLayout>
              </div>
            ) : (
              <FocusLayoutContainer className="min-h-screen">
                <CarouselContainer
                  orientation="vertical"
                  focusTrack={focusTrack}
                  tracks={tracks}
                  carouselTracks={carouselTracks}
                />
              </FocusLayoutContainer>
            )}
          </div>
        </LayoutContextProvider>
      )}
      <RoomAudioRenderer />
      <ConnectionStateToast />
    </div>
  );
};
