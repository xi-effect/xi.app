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
  return (
    tracks.length > 0 && (
      <Carousel maxVisibleTiles={maxVisibleTiles} orientation={orientation}>
        {tracks.map((trackReference: any, index: number) => (
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
