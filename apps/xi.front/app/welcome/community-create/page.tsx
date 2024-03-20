'use client';

import { Button } from '@xipkg/button';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { put } from 'pkg.utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@xipkg/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@xipkg/input';
import { FileUploader } from '@xipkg/fileuploader';
import { toast } from 'sonner';
import { del } from 'pkg.utils/fetch';
import { useMainSt } from 'pkg.stores';
import { Logo } from 'pkg.logo';

const FormSchema = z.object({
  community: z.string({
    required_error: 'Обязательное поле',
  }),
});

type RequestBody = {};

type ResponseBody = {
  detail: string;
};

export default function WelcomeCommunityCreate() {
  const updateUser = useMainSt((state) => state.updateUser);

  const router = useRouter();

  const handleBack = async () => {
    const { status } = await del({
      service: 'auth',
      path: '/api/onboarding/stages/community-create/',
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    if (status === 204) {
      updateUser({ onboardingStage: 'community-choise' });
      router.push('/welcome/community');
    } else {
      toast('Ошибка сервера');
    }
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
    const { status } = await put<RequestBody, ResponseBody>({
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
      updateUser({ onboardingStage: 'completed' });
      router.push('/welcome/final');
    } else {
      toast('Ошибка сервера');
    }
  };

  return (
    <div className="flex flex-row justify-center content-center w-screen h-[100dvh] xs:h-screen">
      <div className="h-full w-full p-8 flex justify-center content-center">
        <div className="flex flex-col h-full xs:p-8 w-full max-w-[536px]">
          <div className="h-22">
            <Logo height={24} width={202} logoVariant="navigation" logoSize="default" />
          </div>
          <div className="mt-16 flex flex-row justify-between w-full items-start gap-4">
            <div className="bg-brand-80 w-1/4 h-1.5 rounded" />
            <div className="bg-brand-80 w-1/4 h-1.5 rounded" />
            <div className="bg-brand-80 w-1/4 h-1.5 rounded" />
            <div className="bg-gray-10 w-1/4 h-1.5 rounded" />
          </div>
          <div id="title" className="mt-8 text-2xl font-semibold leading-[32px] text-gray-100">
            Создайте сообщество
          </div>
          <div className="flex flex-row mt-8 h-16">
            <div className="rounded-[32px] shrink-0 w-16 h-16 bg-brand-80" />
            <div className="ml-4 flex flex-col gap-2">
              <span className="font-medium leading-[22px] text-gray-90 w-full">
                Изображение сообщества
              </span>
              <FileUploader size="small" onChange={() => {}} />
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex flex-col">
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
              <div className="pt-4 mt-auto flex flex-row gap-6">
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
      <div className="hidden md:flex w-full m-w-[856px] bg-gray-5">
        <div className="pt-16 pl-16 h-full w-full relative">
          <div className="absolute h-[calc(100vh-64px)] w-full">
            <Image
              style={{
                objectFit: 'cover',
                objectPosition: 'left',
              }}
              alt="interface example"
              src="/assets/welcome/community-add.png"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
}
