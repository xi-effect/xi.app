import type {
    MessageDecoder,
    MessageEncoder,
    TrackReferenceOrPlaceholder,
    WidgetState,
} from '@livekit/components-core';
import '@livekit/components-styles';
import { isEqualTrackRef, isTrackReference, isWeb, log } from '@livekit/components-core';
import { RoomEvent, Track } from 'livekit-client';
import * as React from 'react';
import { ParticipantTile } from './ParticipantTile'
import {
    CarouselLayout, ConnectionStateToast, FocusLayout,
    FocusLayoutContainer,
    GridLayout,
    LayoutContextProvider,
    MessageFormatter, RoomAudioRenderer,
    useCreateLayoutContext,
    usePinnedTracks,
    useTracks,
} from '@livekit/components-react';
// import { useWarnAboutMissingStyles } from '@livekit/components-react/dist/hooks/useWarnAboutMissingStyles';

export interface VideoConferenceProps extends React.HTMLAttributes<HTMLDivElement> {
    chatMessageFormatter?: MessageFormatter;
    chatMessageEncoder?: MessageEncoder;
    chatMessageDecoder?: MessageDecoder;
    /** @alpha */
    SettingsComponent?: React.ComponentType;
}

export function VideoConference({
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    chatMessageFormatter,
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    chatMessageDecoder,
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    chatMessageEncoder,
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    SettingsComponent,
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
    }, [
        screenShareTracks
            .map((ref) => `${ref.publication.trackSid}_${ref.publication.isSubscribed}`)
            .join(),
        focusTrack?.publication?.trackSid,
    ]);

    // useWarnAboutMissingStyles();

    return (
      <div className="lk-video-conference" {...props}>
        {isWeb() && (
        <LayoutContextProvider
          value={layoutContext}
                    // onPinChange={handleFocusStateChange}
          onWidgetChange={widgetUpdate}
        >
          <div className="lk-video-conference-inner">
            {!focusTrack ? (
              <div className="lk-grid-layout-wrapper">
                <GridLayout tracks={tracks}>
                  <ParticipantTile />
                </GridLayout>
              </div>
                        ) : (
                          <div className="lk-focus-layout-wrapper">
                            <FocusLayoutContainer>
                              <CarouselLayout tracks={carouselTracks}>
                                <ParticipantTile />
                              </CarouselLayout>
                              {focusTrack && <FocusLayout trackRef={focusTrack} />}
                            </FocusLayoutContainer>
                          </div>
                        )}
            {/* <ControlBar controls={{ chat: true, settings: !!SettingsComponent }} /> */}
          </div>
          {/* <Chat */}
          {/*  style={{ display: widgetState.showChat ? 'grid' : 'none' }} */}
          {/*  messageFormatter={chatMessageFormatter} */}
          {/*  messageEncoder={chatMessageEncoder} */}
          {/*  messageDecoder={chatMessageDecoder} */}
          {/* /> */}
        </LayoutContextProvider>
            )}
        <RoomAudioRenderer />
        <ConnectionStateToast />
      </div>
    );
}
