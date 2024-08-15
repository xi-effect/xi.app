/* eslint-disable no-nested-ternary */
import { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import {
  FocusToggleIcon,
  LayoutContext,
  useFocusToggle,
  useMaybeTrackRefContext,
} from '@livekit/components-react';
import { Participant } from 'livekit-client';
import React from 'react';

export interface FocusToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  trackRef?: TrackReferenceOrPlaceholder;
  /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
  participant?: Participant;
}

export function FocusToggle({ trackRef, ...props }: FocusToggleProps) {
  const trackRefFromContext = useMaybeTrackRefContext();

  const { mergedProps, inFocus } = useFocusToggle({
    trackRef: trackRef ?? trackRefFromContext,
    props,
  });

  return (
    <LayoutContext.Consumer>
      {(layoutContext) =>
        layoutContext && (
          <button type="button" {...mergedProps}>
            {props.children ? props.children : inFocus ? null : <FocusToggleIcon />}
          </button>
        )
      }
    </LayoutContext.Consumer>
  );
}
