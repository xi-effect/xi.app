/* eslint-disable react/react-in-jsx-scope */

'use client';

import React, { useEffect, useState } from 'react';
import { Room } from 'livekit-client';
import { ActiveRoom } from './components/ActiveRoom';
import { PreJoin } from './components/PreJoinSection';

export const serverUrl = 'wss://livekit.xieffect.ru';

type VideoConferenceT = {
  token: string;
};

export type LocalUserChoiceT = {
  audioEnabled: boolean;
  videoEnabled: boolean;
};

export const VideoConference = ({ token }: VideoConferenceT) => {
  const [userChoice, setUserChoice] = useState<LocalUserChoiceT | undefined>(undefined);
  const [room] = useState(new Room());
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
        <div id="videoConferenceContainer" className="bg-gray-100">
          <ActiveRoom
            userChoice={userChoice}
            room={room}
            connectInfo={{ connect, setConnect }}
            isConnectInfo={{ isConnected, setIsConnected }}
            token={token}
          />
        </div>
      ) : (
        <PreJoin defaults={preJoinDefaults} connect={connect} onSubmit={onSubmit} />
      )}
    </div>
  );
};
