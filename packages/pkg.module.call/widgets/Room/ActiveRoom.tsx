import { LiveKitRoom } from '@livekit/components-react';
import React from 'react';
import { Room } from 'livekit-client';
import { UpBar } from '../Up';
import { BottomBar } from '../Bottom';
import { VideoGrid } from '../VideoGrid';
import { serverUrl, serverUrlDev, isDevMode, devToken } from '../../config';
import { useCallStore } from '../../stores';

type ActiveRoomPropsT = {
  token: string;
  room: Room;
};

export const ActiveRoom = ({ token, room }: ActiveRoomPropsT) => {
  const audioEnabled = useCallStore((state) => state.audioEnabled);
  const videoEnabled = useCallStore((state) => state.videoEnabled);
  const connect = useCallStore((state) => state.connect);

  const updateStore = useCallStore((state) => state.updateStore);

  const handleConnect = () => {
    updateStore('connect', true);
  };

  const handleDisconnect = () => {
    updateStore('connect', false);
  };

  return (
    <LiveKitRoom
      room={room}
      token={isDevMode ? devToken : token}
      serverUrl={isDevMode ? serverUrlDev : serverUrl}
      connect={connect}
      onConnected={handleConnect}
      onDisconnected={handleDisconnect}
      audio={audioEnabled || false}
      video={videoEnabled || false}
    >
      <div className="flex min-h-screen flex-col justify-stretch">
        <UpBar />
        <div className="flex min-h-[calc(100vh-152px)] items-center justify-center px-4">
          <div className="h-full w-full text-center text-gray-100">
            <VideoGrid />
          </div>
        </div>
        <BottomBar />
      </div>
    </LiveKitRoom>
  );
};
