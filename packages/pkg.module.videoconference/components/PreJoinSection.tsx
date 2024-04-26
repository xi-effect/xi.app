/* eslint-disable import/no-extraneous-dependencies */

import { Button } from '@xipkg/button';
import React from 'react';
import { useMediaDeviceSelect } from '@livekit/components-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@xipkg/select';
import { Conference, Microphone, SoundTwo } from '@xipkg/icons';
import { PreJoin } from './PreJoin';

interface IPreJoinSection {
  connect: boolean;
  setConnect: (arg: (prev: boolean) => boolean) => void;
  setUserChoice: (arg: { audioEnabled: boolean; videoEnabled: boolean }) => void | undefined;
}

export function PreJoinSection({ setConnect, connect, setUserChoice }: IPreJoinSection) {
  const videoControl = useMediaDeviceSelect({
    kind: 'videoinput',
  });
  const audioControl = useMediaDeviceSelect({
    kind: 'audioinput',
  });
  const dinamicControl = useMediaDeviceSelect({
    kind: 'audiooutput',
  });
  return (
    <div>
      <h2 className="mb-4 font-sans text-2xl font-medium">Присоединиться к конференции</h2>
      <div className="my-10 flex w-full gap-12 px-4">
        {/* eslint-disable-next-line max-len */}
        <PreJoin
          setUserChoice={setUserChoice}
          defaults={{ videoEnabled: true, audioEnabled: true }}
        />
        <div className="w-[737px]">
          <div className="border-gray-30 rounded-[16px] border  p-5">
            {!connect ? (
              <div className="bg-gray-5 mb-4 rounded-md p-2 font-sans">
                <h2 className="text-[20px] font-medium">Конференция не началась</h2>
                <p>Дождитесь организатора</p>
              </div>
            ) : null}
          </div>
          <div className="my-4">
            <h2 className="font-sans">Камера</h2>
            <Select>
              <SelectTrigger className="w-full">
                <Conference width={14} />
                <SelectValue placeholder="Встроенная камера" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  {videoControl.devices.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="my-4">
            <h2 className="font-sans">Звук</h2>
            <div className="flex flex-col gap-2">
              <Select>
                <SelectTrigger className="w-full">
                  <Microphone width={14} />
                  <SelectValue placeholder="Встроенный микрофон" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    {audioControl.devices.map((device) => (
                      <SelectItem
                        key={device.deviceId}
                        onSelect={() => audioControl.setActiveMediaDevice(device.deviceId)}
                        value={device.deviceId}
                      >
                        {device.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full">
                  <SoundTwo width={14} />
                  <SelectValue placeholder="Встроенные динамики" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    {dinamicControl.devices.map((device) => (
                      <SelectItem
                        key={device.deviceId}
                        onSelect={() => dinamicControl.setActiveMediaDevice(device.deviceId)}
                        value={device.deviceId}
                      >
                        {device.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full" type="submit" onClick={() => setConnect((prev) => !prev)}>
            Присоединиться
          </Button>
        </div>
      </div>
    </div>
  );
}
