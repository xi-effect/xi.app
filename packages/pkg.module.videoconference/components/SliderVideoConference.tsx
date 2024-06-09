/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';
import { getTrackReferenceId } from '@livekit/components-core';
import { TrackLoopProps, TrackRefContext } from '@livekit/components-react';
import { ChevronLeft, ChevronRight } from '@xipkg/icons';
import { IOrientationLayout } from './VideoConferenceLayout';

interface ITrackLoopProps {
  maxVisibleTiles: number;
}

export function SliderVideoConference({
  tracks,
  maxVisibleTiles,
  orientation,
  ...props
}: TrackLoopProps & ITrackLoopProps & IOrientationLayout) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    vertical: orientation === 'vertical',
    verticalSwiping: orientation === 'vertical',
    nextArrow: <ChevronRight />,
    prevArrow: <ChevronLeft />,
    slidesToScroll: maxVisibleTiles,
  };
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
      {tracks.length > 0 && (
        <Slider {...settings}>
          {tracks.map((trackReference: any) => (
            <TrackRefContext.Provider
              value={trackReference}
              key={getTrackReferenceId(trackReference)}
            >
              {cloneSingleChild(props.children)}
            </TrackRefContext.Provider>
          ))}
        </Slider>
      )}
    </div>
  );
}
