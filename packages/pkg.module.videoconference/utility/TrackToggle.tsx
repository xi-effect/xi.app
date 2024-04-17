import type { CaptureOptionsBySource, ToggleSource } from '@livekit/components-core';
import * as React from 'react';
import { useTrackToggle } from '@livekit/components-react';
import { getSourceIcon } from './getSourceIcon';

/** @public */
export interface TrackToggleProps<T extends ToggleSource>
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  source: T;
  showIcon?: boolean;
  initialState?: boolean;
  onChange?: (enabled: boolean, isUserInitiated: boolean) => void;
  captureOptions?: CaptureOptionsBySource<T>;
}

// eslint-disable-next-line max-len
export function TrackToggle<T extends ToggleSource>({
  showIcon = true,
  ...props
}: TrackToggleProps<T>) {
  const { buttonProps, enabled } = useTrackToggle(props);
  return (
    // eslint-disable-next-line react/button-has-type
    <button {...buttonProps} className="bg-gray-100 p-0">
      {(showIcon ?? true) && getSourceIcon(props.source, enabled)}
      {props.children}
    </button>
  );
}
