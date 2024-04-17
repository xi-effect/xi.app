/* eslint-disable react/react-in-jsx-scope */

'use client';

import { useEffect, useState } from 'react';
import { Room } from 'livekit-client';
import { ActiveRoom } from './components/ActiveRoom';
import { PreJoinSection } from './components/PreJoinSection';

export const serverUrl = 'wss://livekit.xieffect.ru';

type VideoConferenceT = {
  token: string;
};

export interface ILocalUserChoice {
  audioEnabled: boolean;
  videoEnabled: boolean;
}

export const VideoConference = ({ token }: VideoConferenceT) => {
  const [userChoice, setUserChoice] = useState<ILocalUserChoice | undefined>(undefined);
  const [room] = useState(new Room());
  const [connect, setConnect] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  useEffect(() => {
    setIsStarted(connect);
  }, [isConnected || connect]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isStarted ? (
        <div className="bg-gray-100">
          <ActiveRoom
            userChoice={userChoice}
            room={room}
            connectInfo={{ connect, setConnect }}
            isConnectInfo={{ isConnected, setIsConnected }}
            token={token}
          />
        </div>
      ) : (
        <PreJoinSection connect={connect} setConnect={setConnect} setUserChoice={setUserChoice} />
      )}
    </>
  );
};
