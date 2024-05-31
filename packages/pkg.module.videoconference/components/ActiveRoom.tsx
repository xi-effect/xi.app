import { LiveKitRoom, useConnectionQualityIndicator } from '@livekit/components-react';
import { HTMLAttributes } from 'react';
import { ConnectionQuality } from 'livekit-client';
import { UpBar } from './UpBar';
import { BottomBar } from './BottomBar';
import { serverUrl, ILocalUserChoice } from '../VideoConference';
import { ISettingsRoom } from '../types/types';
import { VideoConference } from './VideoTrack';

export function ActiveRoom({
  token,
  room,
  connectInfo,
  isConnectInfo,
  userChoice,
}: ISettingsRoom & { userChoice: ILocalUserChoice | undefined }) {
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
      audio={userChoice?.audioEnabled || false}
      video={userChoice?.videoEnabled || false}
    >
      <div className="flex min-h-screen flex-col justify-between gap-3">
        <UpBar />
        <div className="px-4">
          <div className="text-gray-5 h-full w-full text-center">
            {isConnected && <VideoConference />}
          </div>
        </div>
        <BottomBar />
      </div>
    </LiveKitRoom>
  );
}

export function UserDefinedConnectionQualityIndicator(props: HTMLAttributes<HTMLSpanElement>) {
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
