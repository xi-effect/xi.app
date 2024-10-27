'use client';

import React, { useEffect, useState } from 'react';
import { Room } from 'livekit-client';
import { ActiveRoom } from './components/ActiveRoom';
import { PreJoinSection } from './components/PreJoin';

type CallPropsT = {
  token: string;
};

export type LocalUserChoiceT = {
  audioEnabled: boolean;
  videoEnabled: boolean;
};

export const Call = ({ token }: CallPropsT) => {
  const [userChoice, setUserChoice] = useState<LocalUserChoiceT | undefined>(undefined);
  const room = new Room();
  const [connect, setConnect] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  useEffect(() => {
    setIsStarted(connect);
  }, [isConnected || connect]);

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

  return (
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
  );
};
