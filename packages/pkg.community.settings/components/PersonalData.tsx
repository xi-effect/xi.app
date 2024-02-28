'use client';

import { Close, Plus, Search, Trash } from '@xipkg/icons';
import { Input } from '@xipkg/input';
import React from 'react';
import { Tabs } from '@xipkg/tabs';
import { FormControl, FormItem, FormLabel, FormMessage } from '@xipkg/form';
import ColorPicker from './ColorPicker';
import OptionSwitch from './OptionSwitch';
import Image from 'next/image';

type RoleT = 'admin' | 'user';
const mapRoleCyrillic: Record<RoleT, string> = {
  admin: 'Админ',
  user: 'Пользователь',
};

const tabOptions = ['Настройки', 'Права доступа', 'Участники'] as const;
type TabOptionT = (typeof tabOptions)[number];

export const PersonalData = () => {
  const [selectedRole, setSelectedRole] = React.useState<RoleT | null>('admin');

  const handleAddRole = () => {};
  const handleDeleteRole = () => {};
  const handleChangeColor = () => {};

  return (
    <div className="grid grid-rows-[auto_auto] gap-4 xl:grid-cols-[30%_1fr]">
      <div className="space-y-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Роли</h1>
          <button onClick={handleAddRole} className="bg-transparent p-2">
            <Plus />
          </button>
        </div>
        <ul className="space-y-1">
          {(['admin', 'user'] satisfies RoleT[]).map((el) => (
            <li>
              <button
                className="hover:bg-brand-0 flex w-full gap-3 rounded-lg bg-transparent px-3 py-2 transition"
                onClick={() => setSelectedRole(el)}
              >
                <span className="bg-gray-10 size-6 rounded-full"></span>
                <p className="font-medium text-gray-100">{mapRoleCyrillic[el]}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-gray-30 rounded-2xl border p-6">
        <div className="flex items-center justify-between gap-6">
          <h2>
            {selectedRole
              ? `Редактировать роль - ${mapRoleCyrillic[selectedRole]}`
              : `Создать роль`}
          </h2>
          <button onClick={handleDeleteRole} className="bg-transparent p-2">
            <Trash />
          </button>
        </div>
        <Tabs.Root>
          <Tabs.List>
            {tabOptions.map((el) => (
              <Tabs.Trigger value={el}>{el}</Tabs.Trigger>
            ))}
          </Tabs.List>
          <Tabs.Content className="mt-6 space-y-4 *:space-y-2" value={tabOptions[0]}>
            <FormItem>
              <FormLabel>Название роли</FormLabel>
              <FormControl>
                <Input type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Цвет роли</FormLabel>
              <FormControl>
                <ColorPicker
                  onChange={handleChangeColor}
                  colors={['#445AFF', '#8208E1', '#029127', '#CB4C0E']}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </Tabs.Content>
          <Tabs.Content className="space-y-4" value={tabOptions[1]}>
            {Array.from({ length: 5 }, (_, i) => (
              <OptionSwitch
                onChange={() => {}}
                title="Заголовок"
                description={'Описание'.repeat(i + 1)}
              />
            ))}
          </Tabs.Content>
          <Tabs.Content value={tabOptions[2]}>
            <div className="mt-6 flex gap-3 first:*:grow">
              <Input placeholder="Поиск по участникам" before={<Search />} />
              <button className="bg-brand-80 grid place-items-center rounded-md max-xl:size-12">
                <Plus className="m-2 fill-white xl:hidden" size={'s'} />
                <span className="text-white max-xl:hidden">Добавить участников</span>
              </button>
            </div>
            <ul className="mt-6">
              {Array.from({ length: 4 }, (_, i) => (
                <li>
                  <div className="flex py-3">
                    <Image
                      className="rounded-full"
                      src="/assets/avatarrep.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                    <p className="ml-2 font-medium text-gray-100">Анна Иванова</p>
                    <span className="text-gray-60 ml-1">ivanova.a</span>
                    <button className="ml-auto size-6 rounded-full">
                      <Close className="p-1" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};
