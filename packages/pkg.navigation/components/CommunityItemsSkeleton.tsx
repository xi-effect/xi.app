import React from 'react';

export const CommunityItemsSkeleton = () => (
  <ul className="mt-3 mx-1 flex h-[calc(100dvh-128px)] flex-col gap-4 overflow-y-auto px-5 sm:mb-[60px] sm:px-1">
    {[...new Array(7)].map((item, index) => (
      <li
        key={index.toString()}
        className="bg-gray-10 h-[28px] w-full animate-pulse rounded-[4px] "
      />
    ))}
  </ul>
);
