/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/button-has-type */
import { ChevronLeft, ChevronRight } from '@xipkg/icons';
import React from 'react';
import { IOrientationLayout } from './VideoConferenceLayout';

interface ICarousel {
  children: React.ReactNode;
}
export const Carousel = ({ children, orientation }: ICarousel & IOrientationLayout) => {
  const maxScrollHeight = React.useRef<any>(0);
  const maxScrollWidth = React.useRef<any>(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carousel = React.useRef<any>(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: string) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      if (orientation === 'horizontal') {
        return carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current;
      }
      return carousel.current.offsetHeight * currentIndex >= maxScrollHeight.current;
    }

    return false;
  };

  React.useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      if (orientation === 'horizontal') {
        carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
      } else {
        carousel.current.scrollTop = carousel.current.offsetHeight * currentIndex;
      }
    }
  }, [currentIndex]);

  React.useEffect(() => {
    maxScrollWidth.current =
      carousel.current && orientation === 'horizontal'
        ? carousel.current.scrollWidth - carousel.current.offsetWidth
        : carousel.current
          ? carousel.current.scrollHeight - carousel.current.offsetHeight
          : 0;
  }, []);

  return (
    <div className="carousel mx-auto">
      <div className="relative overflow-hidden">
        <div
          className={`absolute flex h-full w-full items-center justify-between ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}`}
        >
          <button
            onClick={movePrev}
            className="disabled:fill-gray-80 z-10 bg-transparent fill-white p-0 text-center transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed"
            disabled={isDisabled('prev')}
          >
            {orientation === 'horizontal' ? (
              <ChevronLeft className="fill-inherit" />
            ) : (
              <ChevronLeft className="rotate-90 fill-inherit" />
            )}
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="disabled:fill-gray-80 z-10 bg-transparent fill-white p-0 text-center transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed"
            disabled={isDisabled('next')}
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
          ref={carousel}
          className={`${orientation === 'vertical' ? 'my-10 flex h-[calc(100vh-20rem)] flex-col' : 'mx-10'} carousel-container relative z-0 flex h-full w-full touch-pan-x snap-x snap-mandatory gap-5 overflow-hidden scroll-smooth`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
