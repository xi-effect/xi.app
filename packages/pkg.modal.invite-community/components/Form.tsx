/* eslint-disable no-irregular-whitespace */

import React, { useState } from 'react';

import * as z from 'zod';
import * as M from '@xipkg/modal';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@xipkg/input';
import { Button } from '@xipkg/button';
import { Calendar, Plus } from '@xipkg/icons';
import { DatePicker } from '@xipkg/datepicker';
import {
  Form as FormComponent,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  useForm,
} from '@xipkg/form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import { useMainSt } from 'pkg.stores';

const RoleSchema = z.object({
  name: z.string(),
  bgColorMain: z.string(),
  bgColorSecondary: z.string(),
});

const FormSchema = z.object({
  maxUsageCount: z.string(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullish()
    .or(z.string().max(0)),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .nullish()
    .or(z.string().max(0)),
  roles: z.array(RoleSchema),
});

type FormBlockPropsT = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleInviteCreate: (requestData: {
    community_id: number | null;
    data: { expiry: string | null; usage_limit: number | null };
  }) => void;
};

// Создаю список выбора часов для дропдауна
const timeOptions = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

// Временный список ролей
const rolesTemplate = [
  { name: 'Администратор', bgColorMain: 'bg-violet-100', bgColorSecondary: 'bg-violet-20' },
  { name: 'Преподаватель', bgColorMain: 'bg-brand-100', bgColorSecondary: 'bg-brand-0' },
  { name: 'Студент', bgColorMain: 'bg-green-100', bgColorSecondary: 'bg-green-0' },
  { name: 'Гость', bgColorMain: 'bg-red-100', bgColorSecondary: 'bg-red-0' },
  { name: '1', bgColorMain: 'bg-gray-80', bgColorSecondary: 'bg-gray-5' },
  { name: '2', bgColorMain: 'bg-gray-80', bgColorSecondary: 'bg-gray-5' },
];

// Взял типизацию из react-day-picker
type Matcher = boolean | ((date: Date) => boolean) | Date | Date[];

export const Form = ({ setIsOpen, handleInviteCreate }: FormBlockPropsT) => {
  const [date, setDate] = useState<Date | undefined>();
  const [unusedRoles, setUnusedRoles] = useState<typeof rolesTemplate>(rolesTemplate);
  const communityId = useMainSt((state) => state.communityMeta.id);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      maxUsageCount: '',
      date: '',
      time: '',
      roles: [],
    },
  });

  // Отключаем все предыдущие даты перед текущей
  const currentDate = new Date();
  const dateMatcher: Matcher = (selectedDate: Date) => {
    const today = currentDate.setHours(0, 0, 0, 0);
    const selectedDay = new Date(selectedDate).setHours(0, 0, 0, 0);
    return selectedDay < today;
  };

  function resetForm() {
    form.reset();
    setDate(undefined);
    setUnusedRoles(rolesTemplate);
  }

  function onSubmit(values: z.infer<typeof FormSchema>) {
    handleInviteCreate({
      community_id: communityId,
      data: {
        expiry: values.date ? `${values.date}T${values.time || '00:00'}:00.000Z` : null,
        usage_limit: Number(values.maxUsageCount) || null,
      },
    });
  }

  return (
    <FormComponent {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-6 px-6">
          <FormField
            name="maxUsageCount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Максимальное число использований</FormLabel>
                <FormDescription className="text-sm">
                  Для приглашения без ограничения оставить пустым
                </FormDescription>
                <FormControl>
                  <Input
                    className="mt-2"
                    placeholder="от 1 до 99"
                    {...field}
                    maxLength={2}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const onlyNumbers = inputValue.replace(/[^1-9]/g, ''); // Можно вводить только цифры

                      form.setValue('maxUsageCount', onlyNumbers);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <FormLabel>Ограничение по времени</FormLabel>
            <FormDescription className="text-sm">
              Для приглашения без ограничения оставить пустым
            </FormDescription>

            <div className="flex gap-2">
              <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="mt-2">
                      <DatePicker
                        fromMonth={currentDate}
                        disabled={dateMatcher}
                        popoverProps={{ modal: true }}
                        mode="single"
                        className="mt-2 w-full"
                        selected={date}
                        onSelect={(selectedDate: Date | undefined) => {
                          if (selectedDate) {
                            form.setValue(
                              'date',
                              format(selectedDate, 'yyyy-MM-dd', {
                                locale: ru,
                              }),
                            );
                            setDate(selectedDate);
                          }
                        }}
                      >
                        <Input
                          className="mt-2 cursor-pointer"
                          {...field}
                          value={
                            form.getValues('date')
                              ? format((form.getValues('date') ?? '').toString(), 'PPP', {
                                  locale: ru,
                                })
                              : ''
                          }
                          after={
                            <Calendar className="fill-gray-60 pointer-events-none absolute right-0 h-6 w-6" />
                          }
                        />
                      </DatePicker>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="time"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-auto">
                    <FormControl aria-disabled>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Input
                            {...field}
                            className="w-[100px] cursor-pointer disabled:pointer-events-none"
                            disabled={form.getValues('date') === ''}
                            value={
                              form.getValues('date') && (form.getValues('time') || '00:00')
                                ? form.getValues('time') || '00:00'
                                : ''
                            }
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="max-h-[200px] overflow-scroll">
                          {timeOptions.map((option, index) => (
                            <DropdownMenuItem
                              key={index}
                              className="hover:bg-gray-10 rounded-lg"
                              onClick={() => {
                                form.setValue('time', option);
                              }}
                            >
                              <p>{option}</p>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            name="roles"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel>Роли</FormLabel>
                <div className="relative flex-wrap">
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        disabled={unusedRoles.length === 0}
                        className="disabled:bg-transparent"
                      >
                        <Input
                          disabled={unusedRoles.length === 0}
                          placeholder="Выберите роль"
                          className="mt-2 cursor-pointer"
                          after={
                            <Plus
                              className={`${unusedRoles.length === 0 ? 'bg-gray-30' : 'bg-brand-80'} fill-gray-0 pointer-events-none absolute right-0 h-6 w-6 rounded-lg p-1`}
                            />
                          }
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {unusedRoles.map((roleTemplate, index) => (
                          <DropdownMenuItem
                            key={index}
                            className="hover:bg-gray-10 rounded-lg"
                            onClick={() => {
                              form.setValue('roles', [...form.getValues('roles'), roleTemplate]);
                              setUnusedRoles(unusedRoles.filter((role) => role !== roleTemplate));
                            }}
                          >
                            <span
                              className={`bg mr-2 size-3 rounded-full ${roleTemplate.bgColorMain}`}
                            />
                            <p>{roleTemplate.name}</p>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  {form.getValues('roles').length > 0 && (
                    <ul className="pointer-events-none absolute inset-0 z-50 flex h-full w-full flex-wrap items-center gap-2 px-3 pr-11">
                      {form.getValues('roles').map((role, index) => (
                        <li
                          key={index}
                          className={`${role.bgColorSecondary} flex items-center gap-2 rounded-md px-2 py-1 text-xs`}
                        >
                          <span
                            className={`${role.bgColorMain} inline-block size-3 rounded-full`}
                          />
                          {role.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>
        <M.ModalFooter className="flex flex-col justify-between gap-4 md:flex-row md:gap-0">
          <div className="flex flex-col gap-4 md:flex-row">
            <Button className="h-12 px-6" type="submit">
              Создать
            </Button>
            <Button
              variant="secondary"
              className="h-12 px-6"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Отменить
            </Button>
          </div>
          <Button
            type="reset"
            variant="ghost"
            onClick={() => resetForm()}
            className="hidden h-12 px-6 md:inline-block md:w-max"
          >
            Очистить
          </Button>
        </M.ModalFooter>
      </form>
    </FormComponent>
  );
};
