/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@xipkg/form';
import { Input } from '@xipkg/input';
import { Button } from '@xipkg/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useGetUrlWithParams } from 'pkg.utils.client';

const FormSchema = z.object({
  name: z
    .string({
      required_error: 'Обязательное поле',
    })
    .min(1, {
      message: 'Обязательное поле',
    }),
});

type AddCommunityModalT = {
  onOpenChange: (value: boolean) => void;
};

type JoinResponseT = {
  community: {
    description: null;
    id: number;
    name: string;
  };
  participant: {
    is_owner: boolean;
  };
};

const FormCreateBlock = ({ onOpenChange }: AddCommunityModalT) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    // @ts-ignore
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  });
  const {
    control,
    formState: { errors },
  } = form;

  const socket = useMainSt((state) => state.socket);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);

  const router = useRouter();
  const getUrlWithParams = useGetUrlWithParams();

  const onSubmit = ({ name }: z.infer<typeof FormSchema>) => {
    socket?.emit(
      'create-community',
      {
        data: {
          name,
        },
      },
      (status: number, { community, participant }: JoinResponseT) => {
        if (status === 200) {
          if (community.id) {
            updateCommunityMeta({
              id: community.id,
              isOwner: participant.is_owner,
              name: community.name,
              description: community.description,
            });

            router.push(getUrlWithParams(`/communities/${community.id}/home`));
            router.refresh();

            toast('Сообщество успешно создано');
          } else {
            toast('Ошибка сервера');
          }
        } else {
          toast('Ошибка при создании сообщества');
        }

        if (onOpenChange) {
          onOpenChange(false);
        }
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6 pt-5">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl className="mt-2">
                <Input error={!!errors?.name} autoComplete="off" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-6 w-full" type="submit">
          Создать
        </Button>
      </form>
    </Form>
  );
};

export default FormCreateBlock;
