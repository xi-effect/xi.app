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
  Form,
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

export default function FormBlock() {
  // Временный список ролей
  const rolesTemplate = [
    { name: 'Администратор', bgColorMain: 'bg-violet-100', bgColorSecondary: 'bg-violet-20' },
    { name: 'Преподаватель', bgColorMain: 'bg-brand-100', bgColorSecondary: 'bg-brand-0' },
    { name: 'Студент', bgColorMain: 'bg-green-100', bgColorSecondary: 'bg-green-0' },
    { name: 'Гость', bgColorMain: 'bg-red-100', bgColorSecondary: 'bg-red-0' },
    { name: '1', bgColorMain: 'bg-gray-80', bgColorSecondary: 'bg-gray-5' },
    { name: '2', bgColorMain: 'bg-gray-80', bgColorSecondary: 'bg-gray-5' },
  ];

  // Создаю список выбора часов для дропдауна
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const [date, setDate] = useState<Date>();
  const [unusedRoles, setUnusedRoles] = useState<typeof rolesTemplate>(rolesTemplate);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      maxUsageCount: '',
      date: '',
      time: '',
      roles: [],
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
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
                <FormControl className="mt-2">
                  <Input
                    placeholder="от 1 до 99"
                    {...field}
                    max={99}
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
          <div className="flex gap-2">
            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Ограничение по времени</FormLabel>
                  <FormDescription className="text-sm">
                    Для приглашения без ограничения оставить пустым
                  </FormDescription>
                  <FormControl>
                    <DatePicker
                      popoverProps={{ modal: true }}
                      popoverTriggerProps={{}}
                      popoverContentProps={{}}
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
                        className="cursor-pointer"
                        {...field}
                        value={
                          form.getValues('date')
                            ? format((form.getValues('date') ?? '').toString(), 'PPP', {
                                locale: ru,
                              })
                            : ''
                        }
                        after={<Calendar className="fill-gray-60 h-6 w-6" />}
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
                          className={`w-[100px] cursor-pointer disabled:pointer-events-none`}
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
          <FormField
            name="roles"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Роли</FormLabel>
                <div className="relative">
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Input
                          placeholder="Выберите роль"
                          className="text-gray-0 cursor-pointer"
                          {...field}
                          value={
                            form.getValues('roles')
                              ? form
                                  .getValues('roles')
                                  .map((role) => role.name)
                                  .join(', ')
                              : ''
                          }
                          after={
                            <Plus className="bg-brand-80 fill-gray-0 absolute right-0 h-6 w-6 rounded-lg p-1" />
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
                    <ul className="pointer-events-none absolute inset-0 z-50 flex h-full w-full items-center gap-2 px-3 pr-11">
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
        <M.ModalFooter className="flex justify-between">
          <div className="flex gap-4">
            <Button className="h-12 px-6" type="submit">
              Создать
            </Button>
            <Button variant="secondary" className="h-12 px-6" type="button">
              Отменить
            </Button>
          </div>
          <Button type="reset" variant="ghost" onClick={() => form.reset()} className="h-12 px-6">
            Очистить
          </Button>
        </M.ModalFooter>
      </form>
    </Form>
  );
}
