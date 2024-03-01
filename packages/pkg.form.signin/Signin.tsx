'use client';

import React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@xipkg/button';
import { Input } from '@xipkg/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@xipkg/form';
import { redirect, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@xipkg/link';
import { Eyeoff, Eyeon } from '@xipkg/icons';
import { Logo } from 'pkg.logo'

export type SignInT = {
  /**
   * The store type is the store itself.
   */
  onSignIn: any;
};

const FormSchema = z.object({
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
    .min(1, {
      message: 'Обязательное поле',
    }),
});

export const SignIn = ({ onSignIn }: SignInT) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    control,
    setError,
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    trigger();
    const status = await onSignIn({ ...data, setError });
    if (status === 200) router.push('/community/1/home');
  };

  const [isPasswordShow, setIsPasswordShow] = React.useState(false);

  const changePasswordShow = () => {
    setIsPasswordShow((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col justify-items-start space-y-4"
      >
        <div className="self-center">
          <Logo height={22} width={180} logoVariant='navigation' logoSize='default' />
        </div>
        <h1 className="self-center text-2xl font-semibold">Вход в аккаунт</h1>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="pt-4">
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input error={!!errors?.email} autoComplete="on" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  error={!!errors?.password}
                  autoComplete="on"
                  type={isPasswordShow ? 'text' : 'password'}
                  afterClassName="cursor-pointer"
                  after={
                    isPasswordShow ? (
                      <Eyeoff className="fill-gray-60" />
                    ) : (
                      <Eyeon className="fill-gray-60" />
                    )
                  }
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
        <Link size="l" variant="always" href="/reset-password">
          Восстановить пароль
        </Link>
        <div className="flex h-full w-full items-end justify-between">
          <div className="flex h-[56px] items-center">
            <Link
              id="to-signup-link"
              data-umami-event="to-signup-link"
              size="l"
              theme="brand"
              variant="hover"
              href="/signup"
            >
              Зарегистрироваться
            </Link>
          </div>
          <Button variant="default" type="submit">
            Войти
          </Button>
        </div>
      </form>
    </Form>
  );
};
