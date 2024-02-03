'use client';

import {
  LiveKitRoom,
  ParticipantName,
  TrackMutedIndicator,
  RoomAudioRenderer,
  isTrackReference,
  useConnectionQualityIndicator,
  VideoTrack,
  GridLayout,
  useTracks,
  TrackRefContext,
  CarouselLayout,
} from '@livekit/components-react';
import { ConnectionQuality, Room, Track } from 'livekit-client';
import { HTMLAttributes, useState } from 'react';

import { UpBar } from './components/UpBar';
import { BottomBar } from './components/BottomBar';
import { Button } from '@xipkg/button';

const serverUrl = 'wss://livekit.xieffect.ru';

type VideoConferenceT = {
  token: string;
};

// export const VideoConference = ({ token }: VideoConferenceT) => {
//   return (
//     <LiveKitRoom
//       video={true}
//       audio={true}
//       token={token}
//       serverUrl={serverUrl}
//       // style={{ height: '100vh' }}
//       className="h-screen"
//     >
// <div className="p-4 w-full flex flex-row items-end">
//   <span className="text-2xl font-semibold text-gray-0">B1.2</span>
//   <span className="ml-2 text-gray-40">Upper-intermediate</span>

//   <button className="h-10 w-[95px] rounded-[20px] bg-gray-100 flex flex-row items-center justify-center gap-2 ml-auto">
//     <Grid className="fill-gray-0" />
//     <span className="text-gray-0">Вид</span>
//   </button>
//   {/* <button className="h-10 w-10 rounded-[20px] bg-gray-100 flex flex-row items-center justify-center ml-auto">
//     <Maximaze className="fill-gray-0" />
//   </button> */}
//   <button className="h-10 w-10 rounded-[20px] bg-gray-100 flex flex-row items-center justify-center ml-2">
//     <External className="fill-gray-0" />
//   </button>
//   <button className="h-10 w-10 rounded-[20px] bg-gray-100 flex flex-row items-center justify-center ml-2">
//     <Settings className="fill-gray-0" />
//   </button>
// </div>
//       <div className="px-8 py-4 h-[calc(100vh-152px)] flex flex-row">
//         {/* Your custom component with basic video conferencing functionality. */}
//         <MyVideoConference />
//         {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
//         <RoomAudioRenderer />
//       </div>
//       <BottomBar />
//     </LiveKitRoom>
//   );
// };

export const VideoConference = ({ token }: VideoConferenceT) => {
  // const params = typeof window !== 'undefined' ? new URLSearchParams(location.search) : null;
  // const roomName = params?.get('room') ?? 'test-room';
  // const userIdentity = params?.get('user') ?? generateRandomUserId();
  // const token = useToken(process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT, roomName, {
  //   userInfo: {
  //     identity: userIdentity,
  //     name: userIdentity,
  //   },
  // });

  const [room] = useState(new Room());

  const [connect, setConnect] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
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
      audio={true}
      video={true}
      className="h-screen"
    >
      {!isConnected ? (
        <div className="p-4">
          <Button className="lk-button" onClick={() => setConnect(!connect)}>
            {connect ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
      ) : (
        <>
          <UpBar />
          <div className="px-8 py-4 h-[calc(100vh-152px)] flex flex-row">
            <RoomAudioRenderer />
            {/* Render a custom Stage omponent once connected */}
            {isConnected && <Stage />}
          </div>
          <BottomBar />
        </>
      )}
    </LiveKitRoom>
  );
};

export function Stage() {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ]);

  return (
    <>
      <div className="flex flex-row w-full overflow-hidden">
        <GridLayout tracks={tracks}>
          <TrackRefContext.Consumer>
            {(track) =>
              track && (
                <div className="text-gray-5 bg-gray-80 w-full h-full min-w-[320px]">
                  {isTrackReference(track) ? <VideoTrack {...track} /> : <p>Camera placeholder</p>}
                  <div className="h-6 w-fit bg-gray-100 flex flex-row rounded p-1 m-2 gap-1">
                    <TrackMutedIndicator source={Track.Source.Microphone} />
                    <TrackMutedIndicator source={track.source} />
                    {/* Overwrite styles: By passing class names, we can easily overwrite/extend the existing styles. */}
                    {/* In addition, we can still specify a style attribute and further customize the styles. */}
                    <ParticipantName
                      className=""
                      // style={{ color: 'blue' }}
                    />
                    {/* Custom components: Here we replace the provided <ConnectionQualityIndicator />  with our own implementation. */}
                    <UserDefinedConnectionQualityIndicator />
                  </div>
                </div>
              )
            }
          </TrackRefContext.Consumer>
        </GridLayout>
      </div>
    </>
  );
}

export function UserDefinedConnectionQualityIndicator(props: HTMLAttributes<HTMLSpanElement>) {
  /**
   *  We use the same React hook that is used internally to build our own component.
   *  By using this hook, we inherit all the state management and logic and can focus on our implementation.
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

  return <span {...props}> {qualityToText(quality)} </span>;
}
