import React from 'react';
import { SkeletonRectangle } from './SkeletonRectangle';
import { SkeletonCircle } from './SkeletonCircle';
import { SkeletonLoader } from './SkeletonLoader';

export const SkeletonMainLayout = () => {
  return (
    <SkeletonLoader>
      <div className="relative flex flex-row">
        <div className="fixed flex h-screen min-w-[350px] flex-col flex-wrap p-6">
          <SkeletonRectangle height={24} className="bg-gray-20 w-[140px] rounded-lg" />
          <div className="mb-4 mt-8 flex flex-row items-center gap-4">
            <SkeletonCircle size={32} />
            <SkeletonRectangle height={24} className="bg-gray-20 rounded-lg" />
          </div>
          <SkeletonRectangle height={24} gap={18} lines={8} className="bg-gray-20 rounded-lg" />
          <div className="mt-auto flex flex-row items-center gap-4">
            <SkeletonCircle size={32} />
            <SkeletonRectangle height={24} className="bg-gray-20 rounded-lg" />
          </div>
        </div>
        <div className="ml-[350px] flex h-screen w-full flex-col p-6">
          <div className="flex flex-row items-center gap-4">
            <SkeletonRectangle height={24} className="bg-gray-20 w-[256px] rounded-lg" />
          </div>
          <div className="mt-8 flex flex-wrap items-start gap-4">
            {[...new Array(4)].map((item, index) => (
              <div key={index} className="h-[260px] w-full max-w-[352px]">
                <SkeletonRectangle height={260} className=" bg-gray-20 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonLoader>
  );
};
