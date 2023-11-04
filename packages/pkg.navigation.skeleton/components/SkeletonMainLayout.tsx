import React from 'react';
import { SkeletonRectangle } from './SkeletonRectangle';
import { SkeletonCircle } from './SkeletonCircle';
import { SkeletonLoader } from './SkeletonLoader';

export const SkeletonMainLayout = () => {
  return (
    <SkeletonLoader>
      <div className="relative flex flex-row">
        <div className="fixed flex flex-col flex-wrap p-6 h-screen min-w-[350px]">
          <SkeletonRectangle height={24} className="bg-gray-20 rounded-lg w-[140px]" />
          <div className="flex flex-row items-center mt-8 mb-4 gap-4">
            <SkeletonCircle size={32} />
            <SkeletonRectangle height={24} className="bg-gray-20 rounded-lg" />
          </div>
          <SkeletonRectangle height={24} gap={18} lines={8} className="bg-gray-20 rounded-lg" />
          <div className="flex flex-row items-center mt-auto gap-4">
            <SkeletonCircle size={32} />
            <SkeletonRectangle height={24} className="bg-gray-20 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col ml-[350px] p-6 h-screen w-full">
          <div className="flex flex-row items-center gap-4">
            <SkeletonRectangle height={24} className="bg-gray-20 rounded-lg w-[256px]" />
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
