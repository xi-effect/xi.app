'use client';

import { useMainSt } from 'pkg.stores';

import React from 'react';
import dynamic from 'next/dynamic';

const VideoConference = dynamic(() =>
  import('pkg.module.videoconference').then((mod) => mod.VideoConference),
);

export default function VideoConferenceInCommunity({ params }: { params: { vid: string } }) {
  const getToken = useMainSt((state) => state.getToken);
  const token = useMainSt((state) => state.token);

  React.useEffect(() => {
    getToken(params.vid);
  }, []);

  return (
    <div className="w-full md:w-[calc(100vw-350px)] md:min-h-screen md:h-screen md:overflow-auto bg-gray-90">
      {token === null ? (
        <>
          <h1 className="text-3xl font-bold"> Видеоконференция </h1>
          <h3 className="text-xl font-bold">{`id: ${params.vid}`}</h3>
        </>
      ) : (
        <>
          <VideoConference token={token} />
        </>
      )}
    </div>
  );
}
