/* eslint-disable max-len */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/button-has-type */
import { ChevronLeft, ChevronRight } from '@xipkg/icons';
import React from 'react';

interface ICarousel {
  children: React.ReactNode;
}
export const Carousel = ({ children }: ICarousel) => {
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
      return carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current;
    }

    return false;
  };

  React.useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  React.useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="carousel mx-auto">
      <div className="relative overflow-hidden">
        <div className="top left absolute flex h-full w-full justify-between">
          <button
            onClick={movePrev}
            className="disabled:fill-gray-80 z-10 m-0 h-full  bg-transparent fill-white p-0 text-center transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed"
            disabled={isDisabled('prev')}
          >
            <ChevronLeft className="fill-inherit" />
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="disabled:fill-gray-80 z-10 m-0 h-full  bg-transparent fill-white p-0 text-center transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed"
            disabled={isDisabled('next')}
          >
            <ChevronRight className="fill-inherit" />
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative z-0 mx-6 flex touch-pan-x snap-x snap-mandatory gap-1 overflow-hidden scroll-smooth"
        >
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
