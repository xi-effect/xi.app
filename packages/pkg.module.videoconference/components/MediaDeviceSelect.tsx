/* eslint-disable prefer-arrow-callback */
import { useMaybeRoomContext, useMediaDeviceSelect } from '@livekit/components-react';
import { SelectItem } from '@xipkg/select';
import { LocalAudioTrack, LocalVideoTrack, RoomEvent } from 'livekit-client';
import * as React from 'react';

export type MediaDeviceKind = 'videoinput' | 'audiooutput' | 'audioinput';

export interface MediaDeviceSelectProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onError'> {
  kind: MediaDeviceKind;
  onActiveDeviceChange?: (deviceId: string) => void;
  onDeviceListChange?: (devices: MediaDeviceInfo[]) => void;
  onDeviceSelectError?: (e: Error) => void;
  initialSelection?: string;
  exactMatch?: boolean;
  track?: LocalAudioTrack | LocalVideoTrack;
  requestPermissions?: boolean;
  onError?: (e: Error) => void;
}

export const MediaDeviceSelect = /* @__PURE__ */ React.forwardRef<
  HTMLUListElement,
  MediaDeviceSelectProps
>(function MediaDeviceSelect(
  {
    kind,
    initialSelection,
    onActiveDeviceChange,
    onDeviceListChange,
    onDeviceSelectError,
    exactMatch,
    track,
    requestPermissions,
    onError,
  }: MediaDeviceSelectProps,
  ref,
) {
  const room = useMaybeRoomContext();
  const handleError = React.useCallback(
    (e: Error) => {
      if (room) {
        room.emit(RoomEvent.MediaDevicesError, e);
      }
      onError?.(e);
    },
    [room, onError],
  );
  const { devices, activeDeviceId, setActiveMediaDevice } = useMediaDeviceSelect({
    kind,
    room,
    track,
    requestPermissions,
    onError: handleError,
  });
  React.useEffect(() => {
    if (initialSelection !== undefined) {
      setActiveMediaDevice(initialSelection);
    }
  }, [setActiveMediaDevice]);

  React.useEffect(() => {
    if (typeof onDeviceListChange === 'function') {
      onDeviceListChange(devices);
    }
  }, [onDeviceListChange, devices]);

  React.useEffect(() => {
    if (activeDeviceId && activeDeviceId !== '') {
      onActiveDeviceChange?.(activeDeviceId);
    }
  }, [activeDeviceId]);

  const handleActiveDeviceChange = async (deviceId: string) => {
    try {
      await setActiveMediaDevice(deviceId, { exact: exactMatch });
    } catch (e) {
      if (e instanceof Error) {
        onDeviceSelectError?.(e);
      } else {
        throw e;
      }
    }
  };
  // Merge Props
  // const mergedProps = React.useMemo(
  //   () => mergeProps(props, { className }, { className: 'lk-list' }),
  //   [className, props],
  // );

  function isActive(deviceId: string, activeDeviceId: string, index: number) {
    return deviceId === activeDeviceId || (index === 0 && activeDeviceId === 'default');
  }

  return (
    <ul ref={ref}>
      {devices.map((device, index) => (
        <li
          key={device.deviceId}
          id={device.deviceId}
          data-lk-active={isActive(device.deviceId, activeDeviceId, index)}
          aria-selected={isActive(device.deviceId, activeDeviceId, index)}
          role="option"
        >
          <button type="submit" onClick={() => handleActiveDeviceChange(device.deviceId)}>
            <SelectItem value={device.deviceId}>{device.label}</SelectItem>
          </button>
        </li>
      ))}
    </ul>
  );
});
