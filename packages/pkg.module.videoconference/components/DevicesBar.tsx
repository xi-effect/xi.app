import React from 'react';
import { useTrackVolume } from '@livekit/components-react';
import { Conference, Microphone } from '@xipkg/icons';
import { motion } from 'framer-motion';
import { LocalAudioTrack, LocalVideoTrack, Track } from 'livekit-client';
import { TrackToggle, TrackToggleProps } from '../utility/TrackToggle';

type DevicesBarPropsT = {
  microTrack: LocalAudioTrack;
  microEnabled: boolean;
  microTrackToggle: TrackToggleProps<Track.Source.Microphone>;
  videoTrack: LocalVideoTrack;
  videoEnabled: boolean;
  videoTrackToggle: TrackToggleProps<Track.Source.Camera>;
};

export const DevicesBar = ({
  microTrack,
  microEnabled,
  microTrackToggle,
  videoTrack,
  videoEnabled,
  videoTrackToggle,
}: DevicesBarPropsT) => {
  const trackVol = useTrackVolume(microTrack);
  const volume = Math.round(trackVol * 100);

  return (
    <>
      <motion.div
        className="flex size-[44px] flex-row items-center justify-center rounded-[24px] bg-gray-100"
        style={{
          background: microEnabled && microTrack ? `linear-gradient(to top, var(--xi-green-60) 0%, transparent ${volume}%)` : 'var(--xi-red-60)',
        }}
        animate={{ background: microEnabled && microTrack ? `linear-gradient(to top, var(--xi-green-60) 0%, transparent ${volume}%)` : 'var(--xi-red-60)' }}
        transition={{ duration: 0.5 }}
      >
        <TrackToggle
          className="flex items-center justify-center size-[40px] rounded-[20px] bg-gray-100 text-gray-0 p-0"
          {...microTrackToggle}
        >
          <Microphone width={25} className="fill-red-0" />
        </TrackToggle>
      </motion.div>
      <div
        className="border-2 flex size-[44px] flex-row items-center justify-center rounded-[24px] bg-gray-100"
        style={{
          borderColor: videoEnabled && videoTrack ? 'var(--xi-green-60)' : 'var(--xi-red-60)',
          transition: 'border-color 0.3s ease',
        }}
      >
        <TrackToggle
          className="bg-transparent text-gray-0"
          {...videoTrackToggle}
        >
          <Conference width={214} className="fill-red-0" />
        </TrackToggle>
      </div>
    </>
  );
};
