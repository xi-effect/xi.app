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
    <div className="mt-4">
      <h2 className="mb-8 font-sans text-[32px] font-medium">Присоединиться к конференции</h2>
      <div className="flex w-full gap-6">
        <PreJoin
          setUserChoice={setUserChoice}
          defaults={{ videoEnabled: true, audioEnabled: true }}
        />
        <div className="border-gray-30 flex w-[737px] flex-col justify-between rounded-[16px] border p-5">
          <div>
            <div>
              {connect ? (
                <div className="bg-gray-5 mb-4 rounded-md p-4 font-sans">
                  <h2 className="text-[20px] font-medium">Конференция не началась</h2>
                  <p>Дождитесь организатора</p>
                </div>
              ) : null}
            </div>
            <div className="my-4">
              <h2 className="mb-1 font-sans">Камера</h2>
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
              <h2 className="mb-1 font-sans">Звук</h2>
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
          </div>
          <Button className="w-full" type="submit" onClick={() => setConnect((prev) => !prev)}>
            Присоединиться
          </Button>
        </div>
      </div>
    </div>
  );
}
