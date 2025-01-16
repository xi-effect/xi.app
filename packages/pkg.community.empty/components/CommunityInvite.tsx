'use client';

import React from 'react';
import { Button } from '@xipkg/button';
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
import { Logo } from 'pkg.logo';
import { useRouter } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { StageType } from '../EmptyCommunity';
import { JoinResponseT } from '../types';

type CommunityInvitePropsT = {
  setStage: (stage: React.SetStateAction<StageType>) => void;
  setTab: (tab: React.SetStateAction<number>) => void;
};

const FormSchema = z.object({
  invite: z.string({
    required_error: 'Обязательное поле',
  }),
});

export default function CommunityInvite({ setStage, setTab }: CommunityInvitePropsT) {
  const [isLoading, setIsLoading] = React.useState(false);

  const socket = useMainSt((state) => state.socket);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);
  const router = useRouter();

  const handleBack = () => {
    setStage('notFound');
    setTab(1);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    // @ts-expect-error TODO: Разобраться с типами
    resolver: zodResolver(FormSchema),
    defaultValues: {
      invite: '',
    },
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = form;

  const watchInvite = watch('invite');

  const onSubmit = async ({ invite }: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    const arrayFromInvite = invite.split('/');

    socket?.emit(
      'join-community',
      {
        code: arrayFromInvite[arrayFromInvite.length - 1],
      },
      async (status: number, { community, participant }: JoinResponseT) => {
        if (status === 409) {
          setIsLoading(false);
          toast('Вы уже являетесь участником сообщества');
        }

        if (status === 200) {
          updateCommunityMeta({
            id: community.id,
            isOwner: participant.is_owner,
            name: community.name,
            description: community.description,
          });

          if (community) {
            setIsLoading(false);
            router.push(`/communities/${community.id}/home`);
          } else {
            setIsLoading(false);
            toast('Ошибка сервера');
          }
        }
      },
    );
  };

  return (
    <div className="flex h-full w-full content-center justify-center p-8">
      <div className="xs:p-8 flex h-full w-full max-w-[536px] flex-col">
        <div className="h-22">
          <Logo height={24} width={202} logoVariant="navigation" logoSize="default" />
        </div>
        <div className="mt-16 flex w-full flex-row items-start justify-between gap-4">
          <div className="bg-brand-80 h-1.5 w-1/2 rounded" />
          <div className="bg-brand-80 h-1.5 w-1/2 rounded" />
        </div>
        <div id="title" className="mt-8 text-2xl font-semibold leading-[32px] text-gray-100">
          Присоединитесь к сообществу
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex h-full w-full flex-col">
            <FormField
              control={control}
              name="invite"
              render={({ field }) => (
                <FormItem className="mt-8">
                  <FormLabel>Ссылка-приглашение</FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      placeholder="https://xieffect.ru/invite/"
                      error={!!errors?.invite}
                      autoComplete="off"
                      type="link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-auto flex flex-row gap-6 pt-4">
              <Button onClick={handleBack} variant="ghost" className="w-[98px]">
                Назад
              </Button>
              {isLoading ? (
                <Button disabled variant="default-spinner" type="submit" className="w-full" />
              ) : (
                <Button disabled={watchInvite.length === 0} type="submit" className="w-full">
                  Продолжить
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
