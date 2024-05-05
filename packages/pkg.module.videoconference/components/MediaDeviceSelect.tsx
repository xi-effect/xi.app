import { useMaybeRoomContext, useMediaDeviceSelect } from '@livekit/components-react';
import { LocalAudioTrack, LocalVideoTrack } from 'livekit-client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SelectItem } from '@xipkg/select';
import React from 'react';

export type MediaDeviceKind = 'videoinput' | 'audiooutput' | 'audioinput';

interface IMediaDeviceSelect {
  track?: LocalAudioTrack | LocalVideoTrack | any;
  kind: MediaDeviceKind;
  initialSelection?: string;
  onDeviceListChange?: (devices: MediaDeviceInfo[]) => void;
  onActiveDeviceChange?: (deviceId: string) => void;
  requestPermissions?: boolean;
}

export function MediaDeviceSelect({
  kind,
  initialSelection,
  track,
  onActiveDeviceChange,
  onDeviceListChange,
  requestPermissions,
}: IMediaDeviceSelect) {
  const room = useMaybeRoomContext();
  const { devices, activeDeviceId, setActiveMediaDevice } = useMediaDeviceSelect({
    kind,
    room,
    track,
    requestPermissions,
  });
  React.useEffect(() => {
    if (initialSelection && initialSelection !== '') {
      setActiveMediaDevice(initialSelection);
    }
  }, [setActiveMediaDevice]);

  React.useEffect(() => {
    if (activeDeviceId && activeDeviceId !== '') {
      onActiveDeviceChange?.(activeDeviceId);
    }
  }, [activeDeviceId]);

  React.useEffect(() => {
    if (activeDeviceId && activeDeviceId !== '') {
      onActiveDeviceChange?.(activeDeviceId);
    }
  }, [activeDeviceId]);

  React.useEffect(() => {
    if (typeof onDeviceListChange === 'function') {
      onDeviceListChange(devices);
    }
  }, [onDeviceListChange, devices]);

  const handleActiveDeviceChange = async (deviceId: string) => {
    try {
      await setActiveMediaDevice(deviceId);
    } catch (e) {
      console.error('Error in the MediaDeviceSelect');
    }
  };

  return devices.map((device) => (
    <SelectItem
      key={device.deviceId}
      onSelect={() => handleActiveDeviceChange(device.deviceId)}
      value={device.deviceId}
    >
      {device.label}
    </SelectItem>
  ));
}
