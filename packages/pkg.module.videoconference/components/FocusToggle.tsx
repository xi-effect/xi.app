/* eslint-disable no-nested-ternary */
import { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import {
  FocusToggleIcon,
  LayoutContext,
  useFocusToggle,
  useMaybeTrackRefContext,
} from '@livekit/components-react';
import { Participant, Track } from 'livekit-client';
import React from 'react';

export interface FocusToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  trackRef?: TrackReferenceOrPlaceholder;
  /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
  trackSource?: Track.Source;
  /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
  participant?: Participant;
}

export function FocusToggle({ trackRef, trackSource, participant, ...props }: FocusToggleProps) {
  const trackRefFromContext = useMaybeTrackRefContext();

  const { mergedProps, inFocus } = useFocusToggle({
    trackRef: trackRef ?? trackRefFromContext,
    trackSource,
    participant,
    props,
  });

  return (
    <LayoutContext.Consumer>
      {(layoutContext) =>
        layoutContext !== undefined && (
          <button type="button" {...mergedProps}>
            {props.children ? props.children : inFocus ? null : <FocusToggleIcon />}
          </button>
        )
      }
    </LayoutContext.Consumer>
  );
}
