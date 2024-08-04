'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useMainSt } from 'pkg.stores';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGetUrlWithParams } from 'pkg.utils.client';

const schema = z.object({
  link: z.string().url({ message: 'Неправильный формат ссылки' }),
});

type FormJoinProps = {
  setStage: (stage: 'create' | 'join') => void;
  onOpenChange?: (value: boolean) => void;
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

const FormJoinBlock = ({ setStage, onOpenChange }: FormJoinProps) => {
  const socket = useMainSt((state) => state.socket);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);
  const router = useRouter();
  const getUrlWithParams = useGetUrlWithParams();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      link: '',
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async ({ link }: z.infer<typeof schema>) => {
    const arrayFromInvite = link.split('/');

    socket?.emit(
      'join-community',
      {
        code: arrayFromInvite[arrayFromInvite.length - 1],
      },

      async (status: number, { community, participant }: JoinResponseT) => {
        if (status === 409) {
          toast('Вы уже являетесь участником сообщества');
        }

        if (status === 200) {
          updateCommunityMeta({
            id: community.id,
            isOwner: participant.is_owner,
            name: community.name,
            description: community.description,
          });

          if (community.id) {
            router.push(getUrlWithParams(`/communities/${community.id}/home`));
          } else {
            toast('Ошибка сервера');
          }
        }

        if (onOpenChange) {
          onOpenChange(false);
        }
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="link"
          render={({ field }) => (
            <FormItem className="p-6">
              <FormLabel>Ссылка-приглашение</FormLabel>
              <FormControl className="mt-2">
                <Input
                  {...field}
                  error={!!errors.link}
                  type="text"
                  autoComplete="off"
                  placeholder="https://xieffect.ru/invite/"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="border-gray-20 flex flex-col gap-4 border-t p-6 min-[700px]:flex-row">
          <Button type="submit">Присоединиться</Button>
          <Button onClick={() => setStage('create')} variant="secondary">
            Отменить
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormJoinBlock;
