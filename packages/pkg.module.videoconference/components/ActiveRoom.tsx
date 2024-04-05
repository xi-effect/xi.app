import {
    GridLayout,
    isTrackReference,
    LiveKitRoom,
    TrackRefContext,
    useConnectionQualityIndicator,
    useTracks,
} from '@livekit/components-react';
import React, { HTMLAttributes } from 'react';
import { ConnectionQuality, Track } from 'livekit-client';
import { UpBar } from './UpBar';
import { BottomBar } from './BottomBar';
import { serverUrl, ILocalUserChoice } from '../VideoConference';
import { ISettingsRoom } from '../types/types';
import { VideoConference } from './VideoTrack';

// eslint-disable-next-line max-len
export function ActiveRoom({ token, room, connectInfo, isConnectInfo, userChoice }: ISettingsRoom & {userChoice : ILocalUserChoice | undefined}) {
    const { connect, setConnect } = connectInfo;
    const { isConnected, setIsConnected } = isConnectInfo;
    const handleDisconnect = () => {
        setConnect(false);
        setIsConnected(false);
    };
    return (
      <LiveKitRoom
        room={room}
        token={token}
        serverUrl={serverUrl}
        connect={connect}
        onConnected={() => setIsConnected(true)}
        onDisconnected={handleDisconnect}
        audio={userChoice?.audioEnabled}
        video={userChoice?.videoEnabled}
        className="h-screen"
      >
        <UpBar />
        <div className="flex h-[calc(100vh-152px)] flex-row px-8 py-4">
          {isConnected && <Stage />}
        </div>
        <BottomBar />
      </LiveKitRoom>
    );
}

export function Stage() {
    const tracks = useTracks([
        { source: Track.Source.Camera, withPlaceholder: true },
        { source: Track.Source.ScreenShare, withPlaceholder: false },
    ]);

    return (
      <div className="flex w-full flex-row overflow-hidden">
        <GridLayout tracks={tracks}>
          <TrackRefContext.Consumer>
            {(track) =>
                            track && (
                            <div className="text-gray-5 h-full w-full min-w-[320px]">
                              {isTrackReference(track) ? <VideoConference className="rounded-[16px] h-auto border-none" {...track} /> :
                              <p>Camera placeholder</p>}
                                {/* eslint-disable-next-line max-len */}
                              {/* <div className="m-2 flex h-6 w-fit flex-row gap-1 rounded bg-gray-100 p-1"> */}
                              {/*  <TrackMutedIndicator source={Track.Source.Microphone} /> */}
                              {/*  <TrackMutedIndicator source={track.source} /> */}
                              {/*  <ParticipantName */}
                              {/*    className="" */}
                              {/*  /> */}
                              {/*  <UserDefinedConnectionQualityIndicator /> */}
                              {/* </div> */}
                            </div>
                            )
                        }
          </TrackRefContext.Consumer>
        </GridLayout>
      </div>
    );
}

export function UserDefinedConnectionQualityIndicator(props: HTMLAttributes<HTMLSpanElement>) {
    /**
     *  We use the same React hook that is used internally to build our own component.
     *  By using this hook, we inherit all the state management and logic and can focus on our
     * implementation.
     */
    const { quality } = useConnectionQualityIndicator();

    function qualityToText(quality: ConnectionQuality): string {
        switch (quality) {
            case ConnectionQuality.Poor:
                return 'Poor';
            case ConnectionQuality.Good:
                return 'Good';
            case ConnectionQuality.Excellent:
                return 'Excellent';
            case ConnectionQuality.Lost:
                return 'Reconnecting';
            default:
                return 'No idea';
        }
    }

    const qualityText = qualityToText(quality);

    return <span {...props}>{qualityText}</span>;
}
