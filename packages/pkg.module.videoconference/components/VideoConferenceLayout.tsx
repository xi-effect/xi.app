/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import '@livekit/components-styles';
import { createInteractingObservable, getScrollBarWidth } from '@livekit/components-core';
import {
  CarouselLayoutProps,
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
import { useSize } from '../utility/useSize';
import { ParticipantTile } from './ParticipantTile';

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

export function FocusLayout({ trackRef, track, ...htmlProps }: FocusLayoutProps) {
  const trackReference = trackRef ?? track;
  return (
    <div>
      <ParticipantTile
        style={{
          maxWidth: '1050px',
          maxHeight: '570px',
          width: '100%',
          height: '100%',
          margin: 'auto',
        }}
        {...trackReference}
        {...htmlProps}
      />
    </div>
  );
}
const MIN_HEIGHT = 130;
const MIN_WIDTH = 140;
const MIN_VISIBLE_TILES = 1;
const ASPECT_RATIO = 8 / 10;
const ASPECT_RATIO_INVERT = (1 - ASPECT_RATIO) * -1;

export function CarouselLayout({ tracks, orientation, ...props }: CarouselLayoutProps) {
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

  React.useLayoutEffect(() => {
    if (asideEl.current) {
      asideEl.current.dataset.lkOrientation = carouselOrientation;
      asideEl.current.style.setProperty('--lk-max-visible-tiles', maxVisibleTiles.toString());
    }
  }, [maxVisibleTiles, carouselOrientation]);

  return (
    <aside
      key={carouselOrientation}
      className="lk-carousel"
      style={{ gap: '1rem', width: 'full' }}
      ref={asideEl}
      {...props}
    >
      <TrackLoop tracks={sortedTiles}>{props.children}</TrackLoop>
    </aside>
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
  const [isOneItem, setIsOneItem] = useState(tracks.length === 1);
  const gridEl = React.createRef<HTMLDivElement>();

  useEffect(() => {
    setIsOneItem(tracks.length === 1);
  }, [tracks.length]);

  const { layout } = useGridLayout(gridEl, tracks.length + (isOneItem ? 1 : 0));
  const pagination = usePagination(layout.maxTiles + (isOneItem ? 1 : 0), tracks);

  useSwipe(gridEl, {
    onLeftSwipe: pagination.nextPage,
    onRightSwipe: pagination.prevPage,
  });

  return (
    <>
      <PaginationPage {...pagination} />
      <PaginationControl {...pagination} />
      <div
        ref={gridEl}
        style={{ gap: '1rem' }}
        data-lk-pagination={pagination.totalPageCount + (isOneItem ? 1 : 0) > 1}
        className="lk-grid-layout"
      >
        <TrackLoop tracks={pagination.tracks}>{props.children}</TrackLoop>
        {isOneItem && (
          <div className="bg-gray-90 flex w-full items-center justify-center rounded-[8px]">
            <p className="font-sans text-[24px]">Здесь пока никого нет</p>
          </div>
        )}
        {tracks.length > layout.maxTiles && (
          <PaginationIndicator
            totalPageCount={pagination.totalPageCount}
            currentPage={pagination.currentPage}
          />
        )}
      </div>
    </>
  );
}
