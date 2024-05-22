'use client';

import React from 'react';
import { Button } from '@xipkg/button';
import { useRouter } from 'next/navigation';
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
import { FileUploader } from '@xipkg/fileuploader';
import { Logo } from 'pkg.logo';
import { put } from 'pkg.utils';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { StageType } from '../EmptyCommunity';

type CommunityCreateProps = {
  setStage: (stage: React.SetStateAction<StageType>) => void;
  setTab: (tab: React.SetStateAction<number>) => void;
};

type RequestBody = {};

type ResponseBody = {
  detail: string;
  communityName: string;
};

const FormSchema = z.object({
  community: z.string({
    required_error: 'Обязательное поле',
  }),
});

export default function CommunityCreate({ setStage, setTab }: CommunityCreateProps) {
  const router = useRouter();

  const handleBack = () => {
    setStage('notFound');
    setTab(0);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      community: '',
    },
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = form;

  const watchCommunity = watch('community');

  const onSubmit = async () => {
    const { status, data } = await put<RequestBody, ResponseBody>({
      service: 'auth',
      path: '/api/onboarding/stages/completed/',
      body: {},
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    if (status === 204) {
      console.log('Название сообщества:', data.communityName);
      router.push(`/community/${data.communityName}`);
    } else {
      toast('Ошибка сервера');
    }
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
          Создайте сообщество
        </div>
        <div className="mt-8 flex h-16 flex-row">
          <div className="bg-brand-80 h-16 w-16 shrink-0 rounded-[32px]" />
          <div className="ml-4 flex flex-col gap-2">
            <span className="text-gray-90 w-full font-medium leading-[22px]">
              Изображение сообщества
            </span>
            <FileUploader size="small" onChange={() => {}} />
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex h-full w-full flex-col">
            <FormField
              control={control}
              name="community"
              render={({ field }) => (
                <FormItem className="mt-8">
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      error={!!errors?.community}
                      autoComplete="off"
                      type="text"
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
              <Button disabled={watchCommunity.length === 0} type="submit" className="w-full">
                Продолжить
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
