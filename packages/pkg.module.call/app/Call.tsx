import React, { useEffect, useState } from 'react';
import { Room } from 'livekit-client';
import { useParams } from 'next/navigation';
import { ActiveRoom } from '../widgets/Room/ActiveRoom';
import { PreJoinSection } from '../widgets/PreJoin';
import { LocalUserChoiceT } from '../shared/types';
import { CallProvider } from './provider';
import { useLivekitToken } from '../shared/hooks';

export const Call = () => {
  const [userChoice, setUserChoice] = useState<LocalUserChoiceT | undefined>(undefined);
  const room = new Room();
  const [connect, setConnect] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const params = useParams<{ 'community-id': string; 'channel-id': string }>();
  const { token } = useLivekitToken(params['community-id'], params['channel-id']);

  useEffect(() => {
    setIsStarted(connect);
  }, [isConnected, connect]);

  const preJoinDefaults = React.useMemo(
    () => ({
      username: '',
      videoEnabled: true,
      audioEnabled: true,
    }),
    [],
  );

  const onSubmit = (userChoices: LocalUserChoiceT) => {
    setUserChoice(userChoices);
    setConnect(true);
  };

  if (!token) return null;

  return (
    <CallProvider>
      <div>
        {isStarted ? (
          <div id="videoConferenceContainer" className="bg-gray-5" data-theme="dark">
            <ActiveRoom
              userChoice={userChoice}
              room={room}
              connectInfo={{ connect, setConnect }}
              isConnectInfo={{ isConnected, setIsConnected }}
              token={token}
            />
          </div>
        ) : (
          <PreJoinSection defaults={preJoinDefaults} connect={connect} onSubmit={onSubmit} />
        )}
      </div>
    </CallProvider>
  );
};
