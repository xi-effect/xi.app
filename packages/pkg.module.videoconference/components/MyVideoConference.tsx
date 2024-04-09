import { CarouselLayout, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import * as React from 'react';
import { ParticipantTile } from './ParticipantTile';

export const MyVideoConference = () => {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );
    return (
      <CarouselLayout
        tracks={tracks}
        style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}
      >
        {/* The GridLayout accepts zero or one child. The child is used
        as a template to render all passed in tracks. */}
        <ParticipantTile />
      </CarouselLayout>
    );
};
