// @ts-nocheck
'use client';

import React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@xipkg/button';
import { Input } from '@xipkg/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@xipkg/form';
import { redirect, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@xipkg/link';
import { Eyeoff, Eyeon } from '@xipkg/icons';

type FormValues = {
  email: string;
  password: string;
};

export type SignUpT = {
  /**
   * The store type is the store itself.
   */
  onSignUp: any;
};

const FormSchema = z.object({
  nickname: z
    .string()
    .min(1, {
      message: 'Обязательное поле',
    })
    .min(5, {
      message: 'Минимальная длина - 5 символов',
    }),
  email: z
    .string({
      required_error: 'Обязательное поле',
    })
    .email({
      message: 'Некорректный формат данных',
    }),
  password: z
    .string({
      required_error: 'Обязательное поле',
    })
    .min(6, {
      message: 'Минимальная длина пароля - 6 символов',
    }),
});

export const SignUp = ({ onSignUp }: SignUpT) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    control,
    setError,
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    trigger();
    const status = onSignUp({ ...data, setError });
    if (status === 200) router.push('/welcome/user-info');
  };

  const [isPasswordShow, setIsPasswordShow] = React.useState(false);

  const changePasswordShow = () => {
    setIsPasswordShow((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col justify-items-start space-y-4"
      >
        <div className="self-center">
          <Image
            height={22}
            width={180}
            alt="xieffect logo"
            src="/assets/brand/navigationlogo.svg"
          />
        </div>
        <h1 className="self-center text-2xl font-semibold">Регистрация</h1>
        <FormField
          control={control}
          name="nickname"
          defaultValue=""
          render={({ field }) => (
            <FormItem className="pt-4">
              <FormLabel htmlFor="user name">Никнейм</FormLabel>
              <FormControl>
                <Input
                  error={!!errors?.nickname}
                  autoComplete="off"
                  type="text"
                  id="user name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="user email">Электронная почта</FormLabel>
              <FormControl>
                <Input
                  error={!!errors?.email}
                  autoComplete="on"
                  type="email"
                  id="user email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="user password">Пароль</FormLabel>
              <FormControl>
                <Input
                  error={!!errors?.password}
                  autoComplete="on"
                  id="user password"
                  type={isPasswordShow ? 'text' : 'password'}
                  after={isPasswordShow ? <Eyeoff className="fill-gray-60" /> : <Eyeon className="fill-gray-60" />}
                  afterProps={{
                    onClick: changePasswordShow,
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full h-full justify-between items-end">
          <div className="flex h-[56px] items-center">
            <Link size="l" theme="brand" variant="hover" href="/">
              Войти
            </Link>
          </div>
          <Button size="m" variant="default" type="submit">
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </Form>
  );
};
