'use client';

import {ActiveRoom} from "./components/ActiveRoom";
import {useEffect, useState} from "react";
import {Room} from "livekit-client";
import {PreJoinSection} from "./components/PreJoinSection";

export const serverUrl = 'wss://livekit.xieffect.ru';

type VideoConferenceT = {
    token: string;
};

export const VideoConference = ({token}: VideoConferenceT) => {
    const [room] = useState(new Room());
    const [connect, setConnect] = useState(false);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isStarted, setIsStarted] = useState<boolean>(false)

    useEffect(() => {
        setIsStarted(connect)
    }, [isConnected || connect]);

    return (
        <>
            {isStarted ? <ActiveRoom room={room} connectInfo={{connect, setConnect}}
                                     isConnectInfo={{isConnected, setIsConnected}}
                                     token={token}/> :
                <PreJoinSection connect={connect} setConnect={setConnect} token={token}/>

            }
        </>
    );
};

