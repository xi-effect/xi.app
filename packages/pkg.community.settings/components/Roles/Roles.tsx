'use client';

import { Close, Plus, Search, Trash } from '@xipkg/icons';
import { Input } from '@xipkg/input';
import * as M from '@xipkg/modal';
import React from 'react';
import { Tabs } from '@xipkg/tabs';
import { Form, FormControl, FormItem, FormLabel, FormMessage, useForm } from '@xipkg/form';
import { Button } from '@xipkg/button';
import AddParticipantsModal from './AddParticipantsModal';
import ColorPicker from './ColorPicker';
import OptionSwitch from './OptionSwitch';
import UserCard from './UserCard';
import { Header } from '../Header';

type RoleT = 'admin' | 'user';
const mapRoleCyrillic: Record<RoleT, string> = {
  admin: 'Админ',
  user: 'Пользователь',
};

const tabOptions = ['Настройки', 'Права доступа', 'Участники'] as const;

export const Roles = () => {
  const [selectedRole, setSelectedRole] = React.useState<RoleT | undefined>('admin');

  const handleAddRole = () => {
    setSelectedRole(undefined);
  };
  const handleDeleteRole = () => {};
  const handleChangeColor = () => {};
  const handleSelectRole = setSelectedRole;

  const form = useForm({});

  return (
    <>
      <Header />
      <Form {...form}>
        <div className="relative h-full">
          <div className="absolute inset-0 grid gap-4 overflow-hidden max-xl:grid-rows-[auto_1fr] max-xl:overflow-y-auto xl:grid-cols-[30%_1fr]">
            <div className="space-y-4">
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">Роли</h1>
                <button
                  type="button"
                  aria-label="Добавить"
                  onClick={handleAddRole}
                  className="bg-transparent p-2"
                >
                  <Plus />
                </button>
              </div>
              <ul className="space-y-1">
                {(['admin', 'user'] satisfies RoleT[]).map((el) => (
                  <li key={el}>
                    <button
                      type="button"
                      className={`hover:bg-brand-0 flex w-full gap-3 rounded-lg px-3 py-2 transition ${selectedRole === el ? 'bg-brand-0' : 'bg-transparent'}`}
                      onClick={() => handleSelectRole(el)}
                    >
                      <span className="bg-gray-10 size-6 rounded-full" />
                      <p className="font-medium text-gray-100">{mapRoleCyrillic[el]}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-gray-30 box-border rounded-2xl border p-6 xl:row-span-1">
              <div className="flex items-center justify-between gap-6">
                <h2 className="text-xl font-semibold">
                  {selectedRole
                    ? `Редактировать роль - ${mapRoleCyrillic[selectedRole]}`
                    : 'Создать роль'}
                </h2>
                {selectedRole && (
                  <M.Modal>
                    <M.ModalTrigger asChild>
                      <button
                        type="button"
                        aria-label="Удалить"
                        onClick={handleDeleteRole}
                        className="bg-transparent p-2"
                      >
                        <Trash />
                      </button>
                    </M.ModalTrigger>
                    <M.ModalContent className="rounded-2xl bg-white p-8">
                      <Button variant="error">Удалить роль</Button>
                      <M.ModalCloseButton variant="noStyle" asChild>
                        <Button variant="ghost">Отмена</Button>
                      </M.ModalCloseButton>
                    </M.ModalContent>
                  </M.Modal>
                )}
              </div>
              <Tabs.Root defaultValue={tabOptions[0]} className="mt-6 xl:h-full">
                <Tabs.List>
                  {tabOptions.map((el) => (
                    <Tabs.Trigger key={el} value={el}>
                      {el}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
                <div className="*:no-scrollbar relative xl:h-full *:xl:absolute *:xl:inset-0 *:xl:h-full *:xl:overflow-y-auto">
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
                  <Tabs.Content className="h-full space-y-4" value={tabOptions[1]}>
                    {Array.from({ length: 12 }, (_, i) => (
                      <OptionSwitch
                        key={i}
                        onChange={() => {}}
                        title="Заголовок"
                        description={'Описание'.repeat(i + 1)}
                      />
                    ))}
                  </Tabs.Content>
                  <Tabs.Content value={tabOptions[2]}>
                    <div className="mt-6 flex gap-3 first:*:grow">
                      <Input placeholder="Поиск по участникам" before={<Search />} />
                      <AddParticipantsModal
                        subtitle={selectedRole ? mapRoleCyrillic[selectedRole] : ''}
                      >
                        <Button>
                          <Plus className="m-2 fill-white xl:hidden" size="s" />
                          <span className="font-medium text-white max-xl:hidden">
                            Добавить участников
                          </span>
                        </Button>
                      </AddParticipantsModal>
                    </div>
                    <ul className="mt-6">
                      {Array.from({ length: 4 }, (_, i) => (
                        <li key={i}>
                          <UserCard
                            login="ivanova.a"
                            name={`Анна Иванова ${i}`}
                            avatarSrc="/assets/avatarrep.svg"
                            after={
                              <button
                                type="button"
                                aria-label="Удалить"
                                className="ml-auto size-6 rounded-full"
                              >
                                <Close className="p-1" />
                              </button>
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </Tabs.Content>
                </div>
              </Tabs.Root>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};
