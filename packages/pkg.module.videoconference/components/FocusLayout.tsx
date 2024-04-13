import React from 'react';
import { FocusLayoutProps } from '@livekit/components-react';
import { ParticipantTile } from './ParticipantTile';

export function FocusLayout({ trackRef, track, ...htmlProps }: FocusLayoutProps) {
  const trackReference = trackRef ?? track;
  return <ParticipantTile {...trackReference} {...htmlProps} />;
}
