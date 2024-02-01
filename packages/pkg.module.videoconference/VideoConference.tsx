'use client';

import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import { Grid, External, Settings } from '@xipkg/icons';
import { MyVideoConference } from './components/MyVideoConference';
import { BottomBar } from './components/BottomBar';

const serverUrl = 'wss://livekit.xieffect.ru';

type VideoConferenceT = {
  token: string;
};

export const VideoConference = ({ token }: VideoConferenceT) => {
  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={serverUrl}
      // style={{ height: '100vh' }}
      className="h-screen"
    >
      <div className="p-4 w-full flex flex-row items-end">
        <span className="text-2xl font-semibold text-gray-0">B1.2</span>
        <span className="ml-2 text-gray-40">Upper-intermediate</span>

        <button className="h-10 w-[95px] rounded-[20px] bg-gray-100 flex flex-row items-center justify-center gap-2 ml-auto">
          <Grid className="fill-gray-0" />
          <span className="text-gray-0">Вид</span>
        </button>
        {/* <button className="h-10 w-10 rounded-[20px] bg-gray-100 flex flex-row items-center justify-center ml-auto">
          <Maximaze className="fill-gray-0" />
        </button> */}
        <button className="h-10 w-10 rounded-[20px] bg-gray-100 flex flex-row items-center justify-center ml-2">
          <External className="fill-gray-0" />
        </button>
        <button className="h-10 w-10 rounded-[20px] bg-gray-100 flex flex-row items-center justify-center ml-2">
          <Settings className="fill-gray-0" />
        </button>
      </div>
      <div className="px-8 py-4 h-[calc(100vh-152px)] flex flex-row">
        {/* Your custom component with basic video conferencing functionality. */}
        <MyVideoConference />
        {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
        <RoomAudioRenderer />
      </div>
      <BottomBar />
    </LiveKitRoom>
  );
};
