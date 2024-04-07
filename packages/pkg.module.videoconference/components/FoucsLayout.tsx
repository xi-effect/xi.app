import { FocusLayoutProps } from "@livekit/components-react";
import { ParticipantTile } from "./ParticipantTile";
import React from "react";

export function FocusLayout({ trackRef, track, ...htmlProps }: FocusLayoutProps) {
    const trackReference = trackRef ?? track;
    return <ParticipantTile {...trackReference} {...htmlProps} />;
  }