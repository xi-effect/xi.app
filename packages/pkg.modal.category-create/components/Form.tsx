/* eslint-disable no-irregular-whitespace */

import React from 'react';
import * as z from 'zod';
import * as M from '@xipkg/modal';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@xipkg/input';
import { Button } from '@xipkg/button';
// import { Toggle } from '@xipkg/toggle';
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
import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';

const FormSchema = z.object({
  title: z.string().min(1, { message: 'Поле не должно быть пустым' }),
  subtitle: z.string(),
  channels: z.array(z.string()).default([]),
  isPrivate: z.boolean().default(false),
});

type FormSchemaT = z.infer<typeof FormSchema>;

// Варианты каналов, которые можно добавить
const channelsOptions = ['Объявления', 'Задания', 'Видеоконференция', 'Чат'];

const channelDict: { [key in string]: string } = {
  Объявления: 'posts',
  Задания: 'tasks',
  Видеоконференция: 'video',
  Чат: 'chats',
};

type FormT = {
  onOpenChange: () => void;
};

export const Form = ({ onOpenChange }: FormT) => {
  const [isButtonActive, setIsButtonActive] = React.useState(true);

  const socket = useMainSt((state) => state.socket);
  const communityId = useMainSt((state) => state.communityMeta.id);

  const categories = useMainSt((state) => state.categories);
  const updateCategories = useMainSt((state) => state.updateCategories);

  const channels = useMainSt((state) => state.channels);
  const updatedChannels = useMainSt((state) => state.updateChannels);

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
  const toggleChannels = (channelName: string, isChannel: boolean | string) => {
    const channelsValue = form.getValues('channels');

    if (isChannel) {
      form.setValue('channels', [...channelsValue, channelName]);
      return;
    }

    // Если isChannel === false, удаляем указанный канал из массива
    const updatedChannels = channelsValue.filter((channel) => channel !== channelName);
    form.setValue('channels', updatedChannels);
  };

  const onSubmit = (values: FormSchemaT) => {
    setIsButtonActive(false);

    socket?.emit(
      'create-category',
      {
        community_id: communityId,
        data: {
          name: values.title,
          description: values.subtitle,
        },
      },
      (status: number, data: { id: number; name: string; description: string | null }) => {
        if (status === 201) {
          toast('Категория успешно создана');

          if (values.channels.length !== 0) {
            values.channels.forEach((item) => {
              socket?.emit(
                'create-channel',
                {
                  community_id: communityId,
                  category_id: data.id,
                  data: {
                    kind: channelDict[item],
                    name: item,
                    description: null,
                  },
                },
                (status: number, dataAnswer: any) => {
                  console.log('ans', status, dataAnswer);
                  // TODO Каналы не создаются больше одного, надо пофиксить, мб рекурсией
                  updatedChannels([
                    ...(channels || []),
                    {
                      id: dataAnswer.id,
                      name: dataAnswer.name,
                      description: dataAnswer.description,
                      uid: nanoid(),
                      categoryId: data.id,
                      kind: dataAnswer.kind,
                    },
                  ]);
                },
              );
            });
          }

          updateCategories([
            ...(categories || []),
            { id: data.id, name: data.name, description: data.description, uid: nanoid() },
          ]);
          onOpenChange();
          form.reset();
        } else {
          setIsButtonActive(true);
          toast('Произошла ошибка');
        }
      },
    );
    console.log(values);
  };

  return (
    <FormComponent {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid max-h-[calc(100vh-80px-182px)] gap-6 overflow-auto p-6">
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
          {/* <div className="bg-gray-5 flex items-center justify-between gap-8 rounded-md p-4">
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
          </div> */}
        </div>
        <M.ModalFooter>
          {isButtonActive ? (
            <Button variant="default" type="submit" className="w-full">
              Создать
            </Button>
          ) : (
            <Button variant="default-spinner" className="w-full" disabled />
          )}
        </M.ModalFooter>
      </form>
    </FormComponent>
  );
};
