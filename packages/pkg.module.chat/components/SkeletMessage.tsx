import React from 'react';

type LoadingSkeletonProps = {
  refProp: React.Ref<HTMLDivElement>;
};

export const SkeletMessage = ({ refProp }: LoadingSkeletonProps) => (
  <div className="flex w-full p-2" ref={refProp}>
    <div className="bg-gray-10 mr-2 h-12 w-12 rounded-full" />
    <div className="flex-1">
      <div className="flex items-center">
        <div className="bg-gray-10 mr-2 h-6 w-36 rounded-lg" />
        <div className="text-s-base bg-gray-10 h-5 w-24 rounded-lg" />
      </div>
      <div className="bg-gray-10 mt-1 h-6 w-full rounded-lg" />
    </div>
  </div>
);
