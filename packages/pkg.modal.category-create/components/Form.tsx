/* eslint-disable no-irregular-whitespace */

import React from 'react';
import * as z from 'zod';
import * as M from '@xipkg/modal';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@xipkg/input';
import { Button } from '@xipkg/button';
import { Toggle } from '@xipkg/toggle';
import {
  Form as FormComponent,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  useForm,
} from '@xipkg/form';
import { Checkbox } from '@xipkg/checkbox';

const FormSchema = z.object({
  title: z.string().min(1, { message: 'Поле не должно быть пустым' }),
  subtitle: z.string(),
  channels: z.array(z.string()).default([]),
  isPrivate: z.boolean().default(false),
});

type FormSchemaT = z.infer<typeof FormSchema>;

// Варианты каналов, которые можно добавить
const channelsOptions = ['Объявления', 'Задания', 'Видеоконференции', 'Чат со студентами'];

export const Form = () => {
  const form = useForm<FormSchemaT>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      channels: [],
      isPrivate: false,
    },
  });

  // Функция добавления/удаления каналов из channels
  function toggleChannels(channelName: string, isChannel: boolean | string) {
    const channelsValue = form.getValues('channels');

    if (isChannel) {
      form.setValue('channels', [...channelsValue, channelName]);
      return;
    }

    // Если isChannel === false, удаляем указанный канал из массива
    const updatedChannels = channelsValue.filter((channel) => channel != channelName);
    form.setValue('channels', updatedChannels);
  }

  function onSubmit(values: FormSchemaT) {
    console.log(values);
  }

  return (
    <FormComponent {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6 px-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl className="mt-2">
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подзаголовок</FormLabel>
                <FormControl className="mt-2">
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="channels"
            render={() => (
              <FormItem>
                <FormLabel>Каналы</FormLabel>
                <FormDescription>Какие каналы будут созданы автоматически</FormDescription>
                <div className="mt-2 grid gap-2">
                  {channelsOptions.map((channel) => (
                    <FormControl key={channel}>
                      <Checkbox
                        size="m"
                        onCheckedChange={(isChecked) => toggleChannels(channel, isChecked)}
                      >
                        <p className="ml-[0.625rem] text-lg">{channel}</p>
                      </Checkbox>
                    </FormControl>
                  ))}
                </div>
              </FormItem>
            )}
          />
          <div className="bg-gray-5 flex items-center justify-between rounded-md p-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-100">Приватная категория</h2>
              <p className="text-gray-80 mt-2 text-base font-normal">
                Контент в данной категории будет доступен только выбранным классам и ролям
              </p>
            </div>
            <FormField
              control={form.control}
              name="isPrivate"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Toggle
                      size="l"
                      checked={form.getValues('isPrivate')}
                      onCheckedChange={(isChecked) => form.setValue('isPrivate', isChecked)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <M.ModalFooter className="mt-6">
          <Button className="w-full" type="submit">
            Создать
          </Button>
        </M.ModalFooter>
      </form>
    </FormComponent>
  );
};
