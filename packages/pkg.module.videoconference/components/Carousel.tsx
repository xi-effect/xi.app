import { ChevronLeft, ChevronRight } from '@xipkg/icons';
import React from 'react';
import { IOrientationLayout } from './VideoConferenceLayout';

interface ICarousel {
  children: React.ReactNode;
  handleNext: () => void;
  handlePrev: () => void;
  handleCheckDisabled: (type: 'prev' | 'next') => boolean;
}
export const Carousel = ({
  children,
  orientation,
  handleNext,
  handleCheckDisabled,
  handlePrev,
}: ICarousel & IOrientationLayout) => (
  <div className="mx-auto h-full w-full">
    <div className="relative h-full overflow-hidden">
      <div
        className={`absolute flex h-full w-full items-center justify-between ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}`}
      >
        <button
          type="button"
          disabled={handleCheckDisabled('prev')}
          onClick={handlePrev}
          className="disabled:fill-gray-80 z-10 bg-transparent fill-white p-0 text-center transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed"
        >
          {orientation === 'horizontal' ? (
            <ChevronLeft className="fill-inherit" />
          ) : (
            <ChevronLeft className="rotate-90 fill-inherit" />
          )}
          <span className="sr-only">Prev</span>
        </button>
        <button
          type="button"
          disabled={handleCheckDisabled('next')}
          onClick={handleNext}
          className="disabled:fill-gray-80 z-10 bg-transparent fill-white p-0 text-center hover:opacity-100 disabled:cursor-not-allowed"
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
