'use client';

import React from 'react';

export default function Announce({ params }: { params: { vid: string } }) {
  console.log('params', params);

  return (
    <div className="w-full md:w-[calc(100vw-350px)] md:min-h-screen md:h-screen md:overflow-auto bg-gray-0">
      announce
    </div>
  );
}
