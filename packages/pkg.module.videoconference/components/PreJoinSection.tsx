import { Button } from '@xipkg/button';
import React from 'react';
import { useMediaDeviceSelect } from '@livekit/components-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@xipkg/select';
import { Conference, Microphone, SoundTwo } from '@xipkg/icons';
import { PreJoin } from './PreJoin';

interface IPreJoinSection {
    connect: boolean,
    setConnect: (arg: (prev: boolean) => boolean) => void
}

export function PreJoinSection({ setConnect, connect }: IPreJoinSection) {
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
        <h2 className="font-sans text-2xl mb-4 font-medium">Присоединиться к конференции</h2>
        <div className="w-full my-10 px-4 gap-12 flex">
          <PreJoin defaults={{ videoEnabled: true, audioEnabled: true }} />
          <div className="w-[737px]">
            <div className="p-5 border border-gray-30  rounded-[16px]">
              {!connect ?
                <div className="font-sans bg-gray-5 p-2 mb-4 rounded-md">
                  <h2 className="font-medium text-[20px]">Конференция не началась</h2>
                  <p>Дождитесь организатора</p>
                </div> : null}
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
                    {videoControl.devices.map((device) =>
                      <SelectItem value={device.deviceId}>{device.label}</SelectItem>,
                                    )}
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
                      {audioControl.devices.map((device) =>
                        <SelectItem
                          onSelect={() => audioControl.setActiveMediaDevice(device.deviceId)}
                          value={device.deviceId}
                        >{device.label}
                        </SelectItem>,
                                        )}
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
                      {dinamicControl.devices.map((device) =>
                        <SelectItem
                          onSelect={() => dinamicControl.setActiveMediaDevice(device.deviceId)}
                          value={device.deviceId}
                        >{device.label}
                        </SelectItem>,
                                        )}
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
