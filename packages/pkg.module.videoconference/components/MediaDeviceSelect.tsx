import { SelectItem } from '@xipkg/select';

export type MediaDeviceKind = 'videoinput' | 'audiooutput' | 'audioinput';

interface IMediaDeviceSelect {
  devices: MediaDeviceInfo[];
}

export function MediaDeviceSelect({ devices }: IMediaDeviceSelect) {
  return (
    <ul>
      {devices && devices.map((device) => (
        <li key={device.deviceId} id={device.deviceId}>
          <SelectItem value={device.deviceId}>{device.label}</SelectItem>
        </li>
      ))}
    </ul>
  );
}
