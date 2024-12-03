import React, { forwardRef } from 'react';

// длина от 40 до 90%
const getRandomLength = () => Math.floor(Math.random() * (100 - 40 + 1)) + 20;
// количество блоков от 1 до 3
const getRandomBlockCount = () => Math.floor(Math.random() * (3 - 1 + 1)) + 1;

export const SkeletMessage = forwardRef<HTMLDivElement>((_, ref) => {
  const blockCount = getRandomBlockCount();

  return (
    <div className="flex w-full p-2" ref={ref}>
      <div className="bg-gray-10 mr-2 h-12 w-12 rounded-full" />
      <div className="flex-1">
        <div className="flex items-center">
          <div className="bg-gray-10 mr-2 h-6 w-36 rounded-lg" />
          <div className="text-s-base bg-gray-10 h-5 w-24 rounded-lg" />
        </div>
        <div className="mt-1">
          {Array.from({ length: blockCount }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-10 mb-1 h-6 rounded-lg"
              style={{ width: `${getRandomLength()}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

SkeletMessage.displayName = 'SkeletMessage';
