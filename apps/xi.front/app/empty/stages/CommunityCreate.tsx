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

type CommunityCreateProps = {
  setStage: (stage: string) => void;
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

export default function CommunityCreate({ setStage }: CommunityCreateProps) {
  const router = useRouter();

  const handleBack = () => {
    setStage('notFound');
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
    <div className="h-full w-full p-8 flex justify-center content-center">
      <div className="flex flex-col h-full xs:p-8 w-full max-w-[536px]">
        <div className="h-22">
          <Logo height={24} width={202} logoVariant="navigation" logoSize="default" />
        </div>
        <div className="mt-16 flex flex-row justify-between w-full items-start gap-4">
          <div className="bg-brand-80 w-1/2 h-1.5 rounded" />
          <div className="bg-brand-80 w-1/2 h-1.5 rounded" />
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
  );
}
