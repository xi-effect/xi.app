import { ArrowUp } from '@xipkg/icons';
import React from 'react';
import { OrientationLayoutT } from './VideoConferenceLayout';

type CarouselPropsT = {
  children: React.ReactNode;
  handleNext: () => void;
  handlePrev: () => void;
  handleCheckDisabled: (type: 'prev' | 'next') => boolean;
};

export const Carousel = ({
  children,
  orientation,
  handleNext,
  handleCheckDisabled,
  handlePrev,
}: CarouselPropsT & OrientationLayoutT) => (
  <div className="mx-auto h-full w-full">
    <div className="relative h-full overflow-hidden">
      <div
        className={`absolute inset-0 flex items-center justify-between ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}`}
      >
        <button
          type="button"
          disabled={handleCheckDisabled('prev')}
          onClick={handlePrev}
          className="disabled:fill-gray-80 z-10 bg-transparent fill-gray-0 p-0 text-center hover:opacity-100 disabled:cursor-not-allowed"
        >
          <div className="flex items-center justify-center rounded-full bg-gray-100 p-2">
            {orientation === 'horizontal' ? (
              <ArrowUp className="-rotate-90 fill-inherit" />
            ) : (
              <ArrowUp className="fill-inherit" />
            )}
          </div>
          <span className="sr-only">Prev</span>
        </button>
        <button
          type="button"
          disabled={handleCheckDisabled('next')}
          onClick={handleNext}
          className="disabled:fill-gray-80 z-10 bg-transparent fill-gray-0 p-0 text-center hover:opacity-100 disabled:cursor-not-allowed"
        >
          <div className="flex items-center justify-center rounded-full bg-gray-100 p-2">
            {orientation === 'horizontal' ? (
              <ArrowUp className="rotate-90 fill-inherit" />
            ) : (
              <ArrowUp className="rotate-180 fill-inherit" />
            )}
          </div>
          <span className="sr-only">Next</span>
        </button>
      </div>
      <div
        className={`${orientation === 'vertical' ? 'my-14 flex h-[calc(100vh-20rem)] flex-col' : 'mx-14'} relative z-0 flex h-full w-full touch-pan-x snap-x snap-mandatory gap-5 overflow-hidden scroll-smooth`}
      >
        {children}
      </div>
    </div>
  </div>
);
