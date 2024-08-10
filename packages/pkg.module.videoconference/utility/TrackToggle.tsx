import type { CaptureOptionsBySource, ToggleSource } from '@livekit/components-core';
import * as React from 'react';
import { useTrackToggle } from '@livekit/components-react';
import { getSourceIcon } from './getSourceIcon';

/** @public */
export type TrackToggleProps<T extends ToggleSource> = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  source: T;
  showIcon?: boolean;
  initialState?: boolean;
  onChange?: (enabled: boolean, isUserInitiated: boolean) => void;
  captureOptions?: CaptureOptionsBySource<T>;
};

export const TrackToggle = <T extends ToggleSource>({
  showIcon = true,
  ...props
}: TrackToggleProps<T>) => {
  const { buttonProps, enabled } = useTrackToggle(props);
  return (
    <button type="button" {...buttonProps} className="bg-transparent p-0">
      {(showIcon ?? true) && getSourceIcon(props.source, enabled)}
      {props.children}
    </button>
  );
};
