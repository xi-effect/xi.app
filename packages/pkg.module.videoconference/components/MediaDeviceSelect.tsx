import { SelectItem } from '@xipkg/select';

export type MediaDeviceKind = 'videoinput' | 'audiooutput' | 'audioinput';

type MediaDeviceSelectPropsT = {
  devices: MediaDeviceInfo[];
};

export const MediaDeviceSelect = ({ devices }: MediaDeviceSelectPropsT) => (
  <ul>
    {devices &&
      devices.map((device) => (
        <li key={device.deviceId} id={device.deviceId}>
          <SelectItem value={device.deviceId}>{device.label}</SelectItem>
        </li>
      ))}
  </ul>
);
