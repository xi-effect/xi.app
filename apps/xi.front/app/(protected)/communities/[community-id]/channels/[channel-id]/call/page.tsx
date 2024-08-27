'use client';

import { useMainSt } from 'pkg.stores';

import React from 'react';
import dynamic from 'next/dynamic';

const Call = dynamic(() => import('pkg.module.call').then((mod) => mod.Call));

export default function CallInCommunity({ params }: { params: { vid: string } }) {
  const getToken = useMainSt((state) => state.getToken);
  const token = useMainSt((state) => state.token);

  React.useEffect(() => {
    getToken(params['[channel-id]']);
  }, []);

  return (
    <div className="w-full md:w-[calc(100vw-350px)] md:min-h-screen md:h-screen md:overflow-auto">
      {token === null ? (
        <div className="h-full w-full flex flex-col bg-gray-0">
          <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <div className="flex justify-center">
              <div
                className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-brand-80 rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Call token={token} />
      )}
    </div>
  );
}
