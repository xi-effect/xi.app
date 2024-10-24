import { LiveKitRoom, useConnectionQualityIndicator } from '@livekit/components-react';
import { HTMLAttributes } from 'react';
import { ConnectionQuality } from 'livekit-client';
import { UpBar } from './UpBar';
import { BottomBar } from './BottomBar';
import { LocalUserChoiceT } from '../Call';
import { ISettingsRoom } from '../types/types';
import { VideoConference } from './VideoTrack';
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

export const UserDefinedConnectionQualityIndicator = (props: HTMLAttributes<HTMLSpanElement>) => {
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
};
