/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/button-has-type */
import { ChevronLeft, ChevronRight } from '@xipkg/icons';
import React from 'react';
import { IOrientationLayout } from './VideoConferenceLayout';
import { ITrackLoopProps } from './SliderVideoConference';

interface ICarousel {
  children: React.ReactNode;
}
export const Carousel = ({
  children,
  orientation,
  maxVisibleTiles,
}: ICarousel & IOrientationLayout & ITrackLoopProps) => {
  React.useEffect(() => {
    console.log(maxVisibleTiles);
  }, [maxVisibleTiles]);
  return (
    <div className="mx-auto h-full w-full">
      <div className="relative h-full overflow-hidden">
        <div
          className={`absolute flex h-full w-full items-center justify-between ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}`}
        >
          <button
            // onClick={movePrev}
            className="disabled:fill-gray-80 z-10 bg-transparent fill-white p-0 text-center transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed"
            // disabled={isDisabled('prev')}
          >
            {orientation === 'horizontal' ? (
              <ChevronLeft className="fill-inherit" />
            ) : (
              <ChevronLeft className="rotate-90 fill-inherit" />
            )}
            <span className="sr-only">Prev</span>
          </button>
          <button
            // onClick={moveNext}
            className="disabled:fill-gray-80 z-10 bg-transparent fill-white p-0 text-center hover:opacity-100 disabled:cursor-not-allowed"
            // disabled={isDisabled('next')}
          >
            {orientation === 'horizontal' ? (
              <ChevronRight className="fill-inherit" />
            ) : (
              <ChevronRight className="rotate-90 fill-inherit" />
            )}
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          className={`${orientation === 'vertical' ? 'my-10 flex h-[calc(100vh-20rem)] flex-col' : 'mx-10'} carousel-container relative z-0 flex h-full w-full touch-pan-x snap-x snap-mandatory gap-5 overflow-hidden scroll-smooth`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
