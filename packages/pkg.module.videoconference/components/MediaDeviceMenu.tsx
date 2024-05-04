/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { LocalAudioTrack, LocalVideoTrack } from 'livekit-client';
import { computeMenuPosition, log, wasClickOutside } from '@livekit/components-core';
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from '@xipkg/select';
import { Conference } from '@xipkg/icons';
import { MediaDeviceKind, MediaDeviceSelect } from './MediaDeviceSelect';

export interface MediaDeviceMenuProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind: MediaDeviceKind;
  initialSelection?: string;
  onActiveDeviceChange?: (kind: MediaDeviceKind, deviceId: string) => void;
  tracks: Partial<Record<MediaDeviceKind, LocalAudioTrack | LocalVideoTrack | undefined>>;
  requestPermissions?: boolean;
  disabled: boolean;
}

export function MediaDeviceMenu({
  kind,
  initialSelection,
  onActiveDeviceChange,
  tracks,
  disabled,
  requestPermissions = false,
  ...props
}: MediaDeviceMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [updateRequired, setUpdateRequired] = React.useState<boolean>(true);
  const [needPermissions, setNeedPermissions] = React.useState(requestPermissions);

  const handleActiveDeviceChange = (kind: MediaDeviceKind, deviceId: string) => {
    log.debug('handle device change');
    setIsOpen(false);
    onActiveDeviceChange?.(kind, deviceId);
  };

  const button = React.useRef<HTMLButtonElement>(null);
  const tooltip = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (isOpen) {
      setNeedPermissions(true);
    }
  }, [isOpen]);

  React.useLayoutEffect(() => {
    if (button.current && tooltip.current && (devices || updateRequired)) {
      computeMenuPosition(button.current, tooltip.current).then(({ x, y }) => {
        if (tooltip.current) {
          Object.assign(tooltip.current.style, { left: `${x}px`, top: `${y}px` });
        }
      });
    }
    setUpdateRequired(false);
  }, [button, tooltip, devices, updateRequired]);

  const handleClickOutside = React.useCallback(
    (event: MouseEvent) => {
      if (!tooltip.current) {
        return;
      }
      if (event.target === button.current) {
        return;
      }
      if (isOpen && wasClickOutside(tooltip.current, event)) {
        setIsOpen(false);
      }
    },
    [isOpen, tooltip, button],
  );

  React.useEffect(() => {
    document.addEventListener<'click'>('click', handleClickOutside);
    window.addEventListener<'resize'>('resize', () => setUpdateRequired(true));
    return () => {
      document.removeEventListener<'click'>('click', handleClickOutside);
      window.removeEventListener<'resize'>('resize', () => setUpdateRequired(true));
    };
  }, [handleClickOutside, setUpdateRequired]);

  return (
    <Select disabled={disabled} defaultValue={initialSelection}>
      <SelectTrigger className="w-full">
        <Conference width={14} />
        <SelectValue placeholder="Встроенная камера" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          <button
            type="button"
            className="w-full bg-transparent"
            onClick={() => setIsOpen(!isOpen)}
            {...props}
          >
            <MediaDeviceSelect
              initialSelection={initialSelection}
              onActiveDeviceChange={(deviceId) => handleActiveDeviceChange(kind, deviceId)}
              onDeviceListChange={setDevices}
              kind={kind}
              track={tracks?.[kind]}
              requestPermissions={needPermissions}
            />
          </button>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
