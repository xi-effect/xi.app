/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React from 'react';
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
    <ParticipantTile
      style={{ width: '1050px', margin: 'auto' }}
      {...trackReference}
      {...htmlProps}
    />
  );
}
const MIN_HEIGHT = 140;
const MIN_WIDTH = 240;
const MIN_VISIBLE_TILES = 1;
const ASPECT_RATIO = 16 / 10;
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
      style={{ gap: '1rem', width: 'full' }}
      className="lk-carousel"
      ref={asideEl}
      {...props}
    >
      <TrackLoop tracks={sortedTiles}>{props.children}</TrackLoop>
    </aside>
  );
}
export function PaginationControl({
  totalPageCount,
  nextPage,
  prevPage,
  currentPage,
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
    <div className="lk-pagination-control" data-lk-user-interaction={interactive}>
      <button className="lk-button" onClick={prevPage}>
        <ChevronLeft />
      </button>
      <span className="lk-pagination-count">{`${currentPage} of ${totalPageCount}`}</span>
      <button className="lk-button" onClick={nextPage}>
        <ChevronRight />
      </button>
    </div>
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
  const gridEl = React.createRef<HTMLDivElement>();

  const { layout } = useGridLayout(gridEl, tracks.length);
  const pagination = usePagination(layout.maxTiles, tracks);

  useSwipe(gridEl, {
    onLeftSwipe: pagination.nextPage,
    onRightSwipe: pagination.prevPage,
  });

  return (
    <div
      ref={gridEl}
      style={{ gap: '1rem' }}
      data-lk-pagination={pagination.totalPageCount > 1}
      className="lk-grid-layout"
    >
      <TrackLoop tracks={pagination.tracks}>{props.children}</TrackLoop>
      {tracks.length > layout.maxTiles && (
        <>
          <PaginationIndicator
            totalPageCount={pagination.totalPageCount}
            currentPage={pagination.currentPage}
          />
          <PaginationControl pagesContainer={gridEl} {...pagination} />
        </>
      )}
    </div>
  );
}
