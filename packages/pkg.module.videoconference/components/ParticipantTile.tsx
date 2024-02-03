import React from 'react';
import { AspectRatio } from '@xipkg/aspect-ratio';
import {
  ConnectionQualityIndicator,
  ParticipantName,
  TrackContext,
  TrackLoop,
  TrackMutedIndicator,
  TrackRefContext,
  VideoTrack,
  isTrackReference,
  useParticipantTile,
  useTracks,
} from '@livekit/components-react';
import { Track } from 'livekit-client';

export const ParticipantTile = ({ ...htmlProps }) => {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );

  return (
    <TrackLoop tracks={tracks}>
      <TrackRefContext.Consumer>
        {(track) =>
          track && (
            <AspectRatio
              ratio={16 / 9}
              className="min-w-[160px] min-h-[90px] h-full w-full bg-orange-20"
            >
              {isTrackReference(track) ? <VideoTrack {...track} /> : <p>Camera placeholder</p>}
              <div>
                <div style={{ display: 'flex' }}>
                  {/* <TrackMutedIndicator>2</TrackMutedIndicator> */}
                </div>
                {/* Overwrite styles: By passing class names, we can easily overwrite/extend the existing styles. */}
                {/* In addition, we can still specify a style attribute and further customize the styles. */}
                <ParticipantName />
                {/* Custom components: Here we replace the provided <ConnectionQualityIndicator />  with our own implementation. */}
                <ConnectionQualityIndicator />
              </div>
            </AspectRatio>
          )
        }
      </TrackRefContext.Consumer>
    </TrackLoop>
  );
};
