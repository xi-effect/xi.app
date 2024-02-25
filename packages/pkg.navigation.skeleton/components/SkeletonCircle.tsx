import React from 'react';

type Props = {
  className?: string;
  size: number;
};

export const SkeletonCircle = (props: Props) => {
  //use default styles but allow override
  const className = props.className ?? 'rounded-full flex-shrink-0 bg-gray-20';
  return <div className={className} style={{ height: props.size, width: props.size }} />;
};
