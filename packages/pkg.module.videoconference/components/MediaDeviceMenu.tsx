/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react';
import { LocalAudioTrack, LocalVideoTrack, RoomEvent } from 'livekit-client';
import { computeMenuPosition, wasClickOutside } from '@livekit/components-core';
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from '@xipkg/select';
import { Conference, Microphone, SoundTwo } from '@xipkg/icons';
import { useMaybeRoomContext, useMediaDeviceSelect } from '@livekit/components-react';
import { MediaDeviceKind, MediaDeviceSelect } from './MediaDeviceSelect';

export interface MediaDeviceMenuProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  kind: MediaDeviceKind;
  initialSelection?: string;
  onActiveDeviceChange?: (kind: MediaDeviceKind, deviceId: string) => void;
  tracks?: Partial<Record<MediaDeviceKind, LocalAudioTrack | LocalVideoTrack | undefined>>;
  requestPermissions?: boolean;
}

export function MediaDeviceMenu({
  kind,
  initialSelection,
  onActiveDeviceChange,
  disabled,
  requestPermissions = false,
}: MediaDeviceMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [updateRequired, setUpdateRequired] = React.useState<boolean>(true);
  const [needPermissions, setNeedPermissions] = React.useState(requestPermissions);
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
  }, [button, tooltip, updateRequired]);

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

  const getPlaceholder = () => {
    const placeholders = {
      audioinput: 'Встроенный микрофон',
      audiooutput: 'Встроенные динамики',
      videoinput: 'Встроенная камера',
      default: 'Неизвестно',
    };
    if (initialSelection === '') return placeholders.default;
    if (!initialSelection && kind) {
      return placeholders[kind] || placeholders.default;
    }
    return placeholders.default;
  };
  const room = useMaybeRoomContext();
  const handleError = React.useCallback(
    (e: Error) => {
      if (room) {
        room.emit(RoomEvent.MediaDevicesError, e);
      }
    },
    [room],
  );
  const { devices, setActiveMediaDevice } = useMediaDeviceSelect({
    kind,
    room,
    requestPermissions,
    onError: handleError,
  });

  async function handleActiveChange(deviceId: string, kind: MediaDeviceKind) {
    // eslint-disable-next-line no-useless-catch
    try {
      setIsOpen(false);
      onActiveDeviceChange?.(kind, deviceId);
      await setActiveMediaDevice(deviceId);
    } catch (e) {
      throw e;
    }
  }
  return (
    <Select
      onValueChange={(value) => handleActiveChange(value, kind)}
      defaultValue={initialSelection || undefined}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        {kind === 'videoinput' && <Conference width={14} />}
        {kind === 'audiooutput' && <SoundTwo width={14} />}
        {!(kind === 'videoinput' || kind === 'audiooutput') && <Microphone width={14} />}
        <SelectValue placeholder={getPlaceholder()} />
      </SelectTrigger>
      <SelectContent
        ref={(ref) => ref?.addEventListener('touchend', (e) => e.preventDefault())}
        className="w-full"
      >
        <SelectGroup>
          <MediaDeviceSelect devices={devices} />
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
