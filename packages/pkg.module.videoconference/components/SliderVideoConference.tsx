import React from 'react';
import { getTrackReferenceId } from '@livekit/components-core';
import { TrackLoopProps, TrackRefContext } from '@livekit/components-react';
import { IOrientationLayout } from './VideoConferenceLayout';
import { Carousel } from './Carousel';

export interface ITrackLoopProps {
  maxVisibleTiles: number;
}

export function SliderVideoConference({
  tracks,
  maxVisibleTiles,
  orientation,
  ...props
}: TrackLoopProps & ITrackLoopProps & IOrientationLayout) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const visibleTracks = tracks.slice(currentIndex, currentIndex + maxVisibleTiles);
  function cloneSingleChild(
    children: React.ReactNode | React.ReactNode[],
    props?: Record<string, any>,
    key?: any,
  ) {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && React.Children.only(children)) {
        return React.cloneElement(child, { ...props, key });
      }
      return child;
    });
  }

  const handleCheckDisabled = (type: 'prev' | 'next') => {
    switch (type) {
      case 'prev':
        return currentIndex - maxVisibleTiles < 0;
      case 'next':
        return currentIndex + maxVisibleTiles >= tracks.length;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentIndex + maxVisibleTiles < tracks.length) {
      setCurrentIndex(currentIndex + maxVisibleTiles);
    }
  };

  const handlePrev = () => {
    if (currentIndex - maxVisibleTiles >= 0) {
      setCurrentIndex(currentIndex - maxVisibleTiles);
    }
  };

  return (
    visibleTracks.length > 0 && (
      <Carousel
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleCheckDisabled={handleCheckDisabled}
        orientation={orientation}
      >
        {visibleTracks.map((trackReference: any, index: number) => (
          <TrackRefContext.Provider
            value={trackReference}
            key={getTrackReferenceId(trackReference)}
          >
            <div key={index} className="text-center">
              <div className="mx-auto h-full w-full text-xl text-white">
                {cloneSingleChild(props.children)}
              </div>
            </div>
          </TrackRefContext.Provider>
        ))}
      </Carousel>
    )
  );
}
