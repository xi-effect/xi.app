/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { getTrackReferenceId } from '@livekit/components-core';
import { TrackLoopProps, TrackRefContext } from '@livekit/components-react';
// import { ChevronLeft, ChevronRight } from '@xipkg/icons';
import { IOrientationLayout } from './VideoConferenceLayout';

interface ITrackLoopProps {
  maxVisibleTiles: number;
}

export function SliderVideoConference({
  tracks,
  // maxVisibleTiles,
  // orientation,
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
    <div className="slider-container">
      {tracks.length > 0 &&
        tracks.map((trackReference: any) => (
          <TrackRefContext.Provider
            value={trackReference}
            key={getTrackReferenceId(trackReference)}
          >
            {cloneSingleChild(props.children)}
          </TrackRefContext.Provider>
        ))}
    </div>
  );
}
