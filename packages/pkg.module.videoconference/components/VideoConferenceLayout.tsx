/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from 'react';
import '@livekit/components-styles';
import {
  TrackReferenceOrPlaceholder,
  createInteractingObservable,
  getScrollBarWidth,
} from '@livekit/components-core';
import {
  TrackLoop,
  useVisualStableUpdate,
  FocusLayoutProps,
  FocusLayoutContainerProps,
  GridLayoutProps,
  useGridLayout,
  usePagination,
  useSwipe,
} from '@livekit/components-react';
import { ChevronLeft, ChevronRight } from '@xipkg/icons';
import { useSearchParams } from 'next/navigation';
// import Slider from 'react-slick';
import { useSize } from '../utility/useSize';
import { ParticipantTile } from './ParticipantTile';
import { SliderVideoConference } from './SliderVideoConference';

export interface PaginationControlProps
  extends Pick<
    ReturnType<typeof usePagination>,
    'totalPageCount' | 'nextPage' | 'prevPage' | 'currentPage'
  > {
  pagesContainer?: React.RefObject<HTMLElement>;
}
export interface PaginationIndicatorProps {
  totalPageCount: number;
  currentPage: number;
}
export interface IOrientationLayout {
  orientation: 'vertical' | 'horizontal' | 'grid';
}

export function EmptyItemContainerOfUser({ ...restProps }) {
  return (
    <div
      {...restProps}
      className="bg-gray-90 flex h-full w-full items-center justify-center rounded-[8px] text-center"
    >
      <p className="font-sans text-[20px]">Здесь пока никого нет</p>
    </div>
  );
}

function useEmptyItemContainerOfUser(tracksLength: number) {
  const [isOneItem, setIsOneItem] = useState(tracksLength === 1);
  useEffect(() => {
    setIsOneItem(tracksLength === 1);
  }, [tracksLength]);
  return isOneItem;
}

export function FocusLayout({
  trackRef,
  track,
  orientation,
  ...htmlProps
}: FocusLayoutProps & IOrientationLayout) {
  const trackReference = trackRef ?? track;
  return (
    <div
      className={`${orientation === 'vertical' ? 'h-[calc(100vh-14rem)] w-[calc(100%-277px)]' : 'm-auto h-[calc(100vh-22rem)] w-fit min-w-[calc(100vh-20%)]'} flex flex-col`}
    >
      <ParticipantTile
        isFocusToggleDisable
        style={{
          width: '100%',
          height: '100%',
        }}
        {...trackReference}
        {...htmlProps}
      />
    </div>
  );
}
const MIN_HEIGHT = 250;
const MIN_WIDTH = 250;
const MIN_VISIBLE_TILES = 3;
const ASPECT_RATIO = 8 / 10;
const ASPECT_RATIO_INVERT = (1 - ASPECT_RATIO) * -1;

export interface CarouselLayoutProps extends React.HTMLAttributes<HTMLMediaElement> {
  tracks: TrackReferenceOrPlaceholder[];
  children: React.ReactNode;
  orientation: 'vertical' | 'horizontal' | 'grid';
}

export function CarouselLayout({
  tracks,
  orientation,
  userTracks,
  ...props
}: CarouselLayoutProps & { userTracks: TrackReferenceOrPlaceholder[] }) {
  const asideEl = React.useRef<HTMLDivElement>(null);
  const [prevTiles, setPrevTiles] = React.useState(0);
  const { width, height } = useSize(asideEl);
  const carouselOrientation = orientation || (height >= width ? 'vertical' : 'horizontal');

  const tileSpan =
    carouselOrientation === 'vertical'
      ? Math.max(width * ASPECT_RATIO_INVERT, MIN_HEIGHT)
      : Math.max(height * ASPECT_RATIO, MIN_WIDTH);
  const scrollBarWidth = getScrollBarWidth();

  const tilesThatFit =
    carouselOrientation === 'vertical'
      ? Math.max((height - scrollBarWidth) / tileSpan, MIN_VISIBLE_TILES)
      : Math.max((width - scrollBarWidth) / tileSpan, MIN_VISIBLE_TILES);

  let maxVisibleTiles = Math.round(tilesThatFit);
  if (Math.abs(tilesThatFit - prevTiles) < 0.5) {
    maxVisibleTiles = Math.round(prevTiles);
  } else if (prevTiles !== tilesThatFit) {
    setPrevTiles(tilesThatFit);
  }

  const sortedTiles = useVisualStableUpdate(tracks, maxVisibleTiles);
  const isOneItem = useEmptyItemContainerOfUser(userTracks.length);
  React.useLayoutEffect(() => {
    if (asideEl.current) {
      asideEl.current.dataset.lkOrientation = carouselOrientation;
      asideEl.current.style.setProperty('--lk-max-visible-tiles', maxVisibleTiles.toString());
    }
  }, [maxVisibleTiles, carouselOrientation]);

  return (
    <div className={`m-auto ${carouselOrientation === 'horizontal' ? 'w-[95%]' : 'mx-5'}`}>
      {isOneItem && (
        <div className="h-[144px] w-[250px]">
          <EmptyItemContainerOfUser />
        </div>
      )}
      <SliderVideoConference
        orientation={orientation}
        maxVisibleTiles={maxVisibleTiles}
        tracks={sortedTiles}
      >
        {props.children}
      </SliderVideoConference>
    </div>
  );
}
export function PaginationControl({
  nextPage,
  prevPage,
  pagesContainer: connectedElement,
}: PaginationControlProps) {
  const [interactive, setInteractive] = React.useState(false);
  React.useEffect(() => {
    let subscription:
      | ReturnType<ReturnType<typeof createInteractingObservable>['subscribe']>
      | undefined;
    if (connectedElement) {
      subscription = createInteractingObservable(connectedElement.current, 2000).subscribe(
        setInteractive,
      );
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [connectedElement]);

  return (
    <div className="flex items-center justify-center gap-2" data-lk-user-interaction={interactive}>
      <button className="bg-transparent" type="button" onClick={prevPage}>
        <ChevronLeft className="fill-white" />
      </button>
      <button className="bg-transparent" type="button" onClick={nextPage}>
        <ChevronRight className="fill-white" />
      </button>
    </div>
  );
}

export function PaginationPage({ totalPageCount, currentPage }: PaginationControlProps) {
  return (
    <span className="flex items-center justify-center text-white">{`${currentPage} of ${totalPageCount}`}</span>
  );
}

export function PaginationIndicator({ totalPageCount, currentPage }: PaginationIndicatorProps) {
  const bubbles = new Array(totalPageCount).fill('').map((_, index) => {
    if (index + 1 === currentPage) {
      return <span data-lk-active key={index} />;
    }
    return <span key={index} />;
  });

  return <div className="lk-pagination-indicator">{bubbles}</div>;
}

export function FocusLayoutContainer({ children }: FocusLayoutContainerProps) {
  return <div>{children}</div>;
}

export function GridLayout({ tracks, ...props }: GridLayoutProps) {
  const isOneItem = useEmptyItemContainerOfUser(tracks.length);
  const gridEl = React.createRef<HTMLDivElement>();

  const { layout } = useGridLayout(gridEl, tracks.length + (isOneItem ? 1 : 0));
  const pagination = usePagination(layout.maxTiles + (isOneItem ? 1 : 0), tracks);

  useSwipe(gridEl, {
    onLeftSwipe: pagination.nextPage,
    onRightSwipe: pagination.prevPage,
  });

  return (
    <div className="m-auto h-[calc(100vh-13rem)] w-full">
      <div
        ref={gridEl}
        style={{ gap: '1rem', maxWidth: '100%', height: '100%', margin: '0 auto' }}
        data-lk-pagination={pagination.totalPageCount + (isOneItem ? 1 : 0) > 1}
        className="lk-grid-layout"
      >
        <TrackLoop tracks={pagination.tracks}>{props.children}</TrackLoop>
        {isOneItem && <EmptyItemContainerOfUser />}
        {tracks.length > layout.maxTiles && (
          <PaginationIndicator
            totalPageCount={pagination.totalPageCount}
            currentPage={pagination.currentPage}
          />
        )}
      </div>
    </div>
  );
}

export function CarouselContainer({ focusTrack, tracks, carouselTracks }: any) {
  const searchParams = useSearchParams();
  const [orientation, setCarouselType] = useState<string | any>('horizontal');

  useEffect(() => {
    setCarouselType(searchParams.get('carouselType') || 'horizontal');
  }, [searchParams]);
  return (
    <div
      className={`flex h-full ${orientation === 'horizontal' ? 'flex-col' : ''} items-start justify-between gap-4`}
    >
      {orientation === 'vertical' ? (
        <>
          {focusTrack && <FocusLayout orientation={orientation} trackRef={focusTrack} />}
          <CarouselLayout orientation={orientation} userTracks={tracks} tracks={carouselTracks}>
            <ParticipantTile style={{ flex: 'unset' }} className="h-[144px] w-[250px]" />
          </CarouselLayout>
        </>
      ) : (
        <>
          <CarouselLayout orientation={orientation} userTracks={tracks} tracks={carouselTracks}>
            <ParticipantTile style={{ flex: 'unset' }} className="h-[144px] w-[250px]" />
          </CarouselLayout>
          {focusTrack && <FocusLayout orientation={orientation} trackRef={focusTrack} />}
        </>
      )}
    </div>
  );
}
