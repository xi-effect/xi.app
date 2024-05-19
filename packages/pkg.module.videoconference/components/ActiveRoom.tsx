import { LiveKitRoom, useConnectionQualityIndicator } from '@livekit/components-react';
import React, { HTMLAttributes } from 'react';
import { ConnectionQuality } from 'livekit-client';
import { UpBar } from './UpBar';
import { BottomBar } from './BottomBar';
import { serverUrl, ILocalUserChoice } from '../VideoConference';
import { ISettingsRoom } from '../types/types';
import { VideoConference } from './VideoTrack';

// eslint-disable-next-line max-len
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
      audio={userChoice?.audioEnabled}
      video={userChoice?.videoEnabled}
    >
      <div className="flex min-h-screen flex-col gap-4">
        <UpBar />
        <div className="flex-grow px-10">{isConnected && <Stage />}</div>
        <BottomBar />
      </div>
    </LiveKitRoom>
  );
}

export function Stage() {
  return (
    <div className="overflow-hidden">
      <div className="text-gray-5 w-full min-w-[320px]">
        <VideoConference className="rounded-[16px] border-none" />
      </div>
    </div>
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
