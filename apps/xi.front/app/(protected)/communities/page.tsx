'use client';

import { useRouter } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import { useEffect } from 'react';

export default function CommunitiesLoading() {
//   const socket = useMainSt((state) => state.socket);
//   const initSocket = useMainSt((state) => state.initSocket);

//   console.log('socket', socket);

//   useEffect(() => {
//     console.log('initSocket');
//     initSocket();
//   }, [socket]);

  return <div>Loading... ....</div>;
}
