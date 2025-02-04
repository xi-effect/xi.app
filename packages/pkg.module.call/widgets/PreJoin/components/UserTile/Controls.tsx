import { usePreviewTracks } from '@livekit/components-react';
import { LocalAudioTrack, LocalVideoTrack, Track } from 'livekit-client';
import React, { useMemo } from 'react';

import { DevicesBar } from '../../../../shared/ui';
import { useCallStore } from '../../../../stores';

export const Controls = () => {
  const audioDeviceId = useCallStore((state) => state.audioDeviceId);
  const audioEnabled = useCallStore((state) => state.audioEnabled);

  const videoDeviceId = useCallStore((state) => state.videoDeviceId);
  const videoEnabled = useCallStore((state) => state.videoEnabled);

  const updateStore = useCallStore((state) => state.updateStore);

  const onError = () => {};

  const tracks = usePreviewTracks(
    {
      audio: audioEnabled ? { deviceId: audioDeviceId } : false,
      video: videoEnabled ? { deviceId: videoDeviceId } : false,
    },
    onError,
  );

  const videoTrack = useMemo(
    () => tracks?.filter((track) => track.kind === Track.Kind.Video)[0] as LocalVideoTrack,
    [tracks],
  );

  const audioTrack = useMemo(
    () => tracks?.filter((track) => track.kind === Track.Kind.Audio)[0] as LocalAudioTrack,
    [tracks],
  );

  return (
    <div className="bg-gray-0 flex w-[96px] gap-1 rounded-[24px] p-0.5">
      <DevicesBar
        microTrack={audioTrack}
        microEnabled={audioEnabled}
        microTrackToggle={{
          initialState: audioEnabled,
          showIcon: false,
          source: Track.Source.Microphone,
          onChange: (enabled) => updateStore('audioEnabled', enabled),
        }}
        videoTrack={videoTrack}
        videoEnabled={videoEnabled}
        videoTrackToggle={{
          initialState: videoEnabled,
          showIcon: false,
          source: Track.Source.Camera,
          onChange: (enabled) => updateStore('videoEnabled', enabled),
        }}
      />
    </div>
  );
};
