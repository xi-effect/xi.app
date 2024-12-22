import { LiveKitRoom } from '@livekit/components-react';
import { UpBar } from './Up';
import { BottomBar } from './Bottom';
import { LocalUserChoiceT } from '../Call';
import { ISettingsRoom } from '../types/types';
import { VideoConference } from './VideoConference';
import { serverUrl, serverUrlDev, isDevMode, devToken } from '../config';

export const ActiveRoom = ({
  token,
  room,
  connectInfo,
  isConnectInfo,
  userChoice,
}: ISettingsRoom & { userChoice: LocalUserChoiceT | undefined }) => {
  const { connect, setConnect } = connectInfo;
  const { isConnected, setIsConnected } = isConnectInfo;
  const handleDisconnect = () => {
    setConnect(false);
    setIsConnected(false);
  };

  return (
    <LiveKitRoom
      room={room}
      token={isDevMode ? devToken : token}
      serverUrl={isDevMode ? serverUrlDev : serverUrl}
      connect={connect}
      onConnected={() => setIsConnected(true)}
      onDisconnected={handleDisconnect}
      audio={userChoice?.audioEnabled || false}
      video={userChoice?.videoEnabled || false}
    >
      <div className="flex min-h-screen flex-col justify-stretch">
        <UpBar />
        <div className="flex min-h-[calc(100vh-152px)] items-center justify-center px-4">
          <div className="h-full w-full text-center text-gray-100">
            {isConnected && <VideoConference />}
          </div>
        </div>
        <BottomBar />
      </div>
    </LiveKitRoom>
  );
};
