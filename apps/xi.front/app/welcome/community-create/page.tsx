// @ts-nocheck
'use client';

import { Button } from '@xipkg/button';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMedia } from 'pkg.utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@xipkg/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@xipkg/input';
import { Label } from '@xipkg/label';

const FormSchema = z.object({
  community: z.string({
    required_error: 'Обязательное поле',
  }),
});

export default function WelcomeCommunityCreate() {
  const isMobile = useMedia('(max-width: 960px)');

  const router = useRouter();

  const handleBack = () => {
    router.push('/welcome/community');
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
    trigger,
    formState: { errors },
  } = form;

  const watchCommunity = watch('community');

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    trigger();
    router.push('/welcome/final');
  };

  return (
    <div className="flex flex-row justify-center content-center w-screen h-screen">
      <div className="h-full w-full p-8 flex justify-center content-center">
        <div className="flex flex-col h-full xs:p-8 w-full max-w-[536px]">
          <div className="h-22">
            <Image
              height={24}
              width={202}
              alt="xieffect logo"
              src="/assets/brand/navigationlogo.svg"
            />
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
          <div className="mt-8 h-16 bg-gray-5">Avatar</div>
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
      {!isMobile && (
        <div className="w-full m-w-[856px] bg-gray-5">
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
      )}
    </div>
  );
}
