'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalCloseButton,
} from '@xipkg/modal';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, useForm } from '@xipkg/form';
import { useMainSt } from 'pkg.stores';
import { Input } from '@xipkg/input';
import { Close, Announce, Task, Conference, Chat, WhiteBoard } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { ActionsSheetButton } from './components/ActionsSheetButton';

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Поле не должно быть пустым' }),
  kind: z.string(),
});

type FormSchemaT = z.infer<typeof FormSchema>;

interface CommunityChannelCreateT {
  open: boolean;
  onOpenChange: () => void;
}
// border-[6px] создает визуал радио-кнопки, по дизайну ширина 6px у обводки синий.
const classBtnActive = 'border-[6px] border-solid border-brand-80';
const classBtnNotActive = 'border border-solid border-gray-30';

const actionsSheetList = [
  {
    icon: Announce,
    title: 'Объявления',
    type: 'posts',
    desctiption: 'Держите ваших студентов в курсе всех новостей вашего сообщества',
  },
  {
    icon: WhiteBoard,
    title: 'Интерактивная доска',
    type: 'board',
    desctiption: 'Проводите уроки и совместные занятия с помощью удобной и функциональной доски',
  },
  {
    icon: Conference,
    title: 'Видеоконференции',
    type: 'call',
    desctiption:
      'Проводите уроки онлайн, проводите активности, работайте со студентами из любой точки мира',
  },
  {
    icon: Task,
    title: 'Задания',
    type: 'tasks',
    desctiption:
      'Создавайте задания, тесты, получайте ответы от учеников, оценивайте и улучшайте знания',
  },
  {
    icon: Chat,
    title: 'Чат со студентами',
    type: 'chat',
    desctiption: 'Общайтесь, отвечайте на вопросы, объясняйте непонятные моменты',
    disabled: true,
  },
];

export const CommunityChannelCreate = ({ open, onOpenChange }: CommunityChannelCreateT) => {
  const socket = useMainSt((state) => state.socket);
  const communityId = useMainSt((state) => state.communityMeta.id);

  const router = useRouter();

  const channels = useMainSt((state) => state.channels);
  const updateChannels = useMainSt((state) => state.updateChannels);

  const form = useForm<FormSchemaT>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      kind: 'posts',
    },
  });

  const onSubmit = (values: FormSchemaT) => {
    socket.emit(
      'create-channel',
      {
        community_id: communityId,
        category_id: null,
        data: {
          kind: values.kind,
          name: values.name,
          description: null,
        },
      },
      (status: number, dataAnswer: any) => {
        if (status === 201) {
          toast('Канал успешно создан');

          updateChannels([
            ...(channels || []),
            {
              uid: nanoid(),
              id: dataAnswer.id,
              categoryId: 'empty',
              kind: dataAnswer.kind,
              name: dataAnswer.name,
            },
          ]);

          router.push(`/communities/${communityId}/channels/${dataAnswer.id}/${dataAnswer.kind}`);

          if (onOpenChange) onOpenChange();
          form.reset();
        }
      },
    );
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="sm:max-w-[560px] xl:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-row items-center justify-between">
              <ModalTitle className="text-[24px] font-bold text-gray-100">
                Создание канала
              </ModalTitle>
              <ModalCloseButton className="static sm:fixed">
                <Close className="fill-gray-80 sm:fill-gray-0" />
              </ModalCloseButton>
            </ModalHeader>
            <div className="max-h-[calc(100vh-80px-182px)] space-y-6 overflow-auto p-6">
              <FormField
                control={form.control}
                name="name"
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
                name="kind"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Тип</FormLabel>
                    <div className="mt-2 space-y-4 overflow-auto">
                      {actionsSheetList.map((item, index) => (
                        <FormControl key={index.toString()} className="mt-2">
                          <ActionsSheetButton
                            Icon={item.icon}
                            title={item.title}
                            desctiption={item.desctiption}
                            disabled={item?.disabled}
                            index={index}
                            сlassName={value === item.type ? classBtnActive : classBtnNotActive}
                            onClick={() => onChange(item.type)}
                          />
                        </FormControl>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <ModalFooter>
              <Button type="submit" className="w-full">
                Создать
              </Button>
            </ModalFooter>
          </form>
        </Form>
      </ModalContent>
    </Modal>
  );
};
