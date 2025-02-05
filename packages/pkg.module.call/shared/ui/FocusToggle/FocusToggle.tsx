import { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import {
  FocusToggleIcon,
  LayoutContext,
  useFocusToggle,
  useMaybeTrackRefContext,
} from '@livekit/components-react';
import { Participant } from 'livekit-client';
import React from 'react';

export type FocusTogglePropsT = {
  trackRef?: TrackReferenceOrPlaceholder;
  /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
  participant?: Participant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const FocusToggle = ({ trackRef, ...props }: FocusTogglePropsT) => {
  const trackRefFromContext = useMaybeTrackRefContext();

  const { mergedProps, inFocus } = useFocusToggle({
    trackRef: trackRef ?? trackRefFromContext,
    props,
  });

  return (
    <LayoutContext.Consumer>
      {(layoutContext) => {
        if (!layoutContext) return null;

        return (
          <button type="button" {...mergedProps}>
            {props.children
              ? props.children
              : !inFocus && <FocusToggleIcon className="fill-gray-100" />}
          </button>
        );
      }}
    </LayoutContext.Consumer>
  );
};
