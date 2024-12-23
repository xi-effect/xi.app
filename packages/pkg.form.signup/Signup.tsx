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
import { useRouter, useSearchParams } from 'next/navigation';
import { Link } from '@xipkg/link';
import { Eyeoff, Eyeon } from '@xipkg/icons';
import { Logo } from 'pkg.logo';
import { useMainSt } from 'pkg.stores';

const FormSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: 'Обязательное поле',
    })
    .min(4, {
      message: 'Минимальная длина - 4 символов',
    })
    .max(30, {
      message: 'Максимальная длина - 30 символов',
    })
    .regex(/^[a-z0-9_.]+$/, {
      message:
        'Используйте только латинский алфавит, в нижнем регистре, цифры или знаки: "_" или "."',
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

export const SignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSignUp = useMainSt((state) => state.onSignUp);
  const form = useForm<z.infer<typeof FormSchema>>({
    // @ts-expect-error TODO: Разобраться с типами
    resolver: zodResolver(FormSchema),
  });

  const {
    control,
    setError,
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;

  const [isButtonActive, setIsButtonActive] = React.useState(true);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    trigger();
    setIsButtonActive(false);
    const status = await onSignUp({ ...data, setError });
    if (status === 200 && searchParams.has('iid') && searchParams.get('community')) {
      router.push(
        `/welcome/user-info?iid=${searchParams.get('iid')}&community=${searchParams.get('community')}`,
      );
    } else if (status === 200) {
      router.push('/welcome/user-info');
    } else {
      setIsButtonActive(true);
    }
  };

  const [isPasswordShow, setIsPasswordShow] = React.useState(false);

  const changePasswordShow = () => {
    setIsPasswordShow((prev) => !prev);
  };

  const getSigninHref = () => {
    if (searchParams.has('iid') && searchParams.get('community')) {
      return `/signin?iid=${searchParams.get('iid')}&community=${searchParams.get('community')}`;
    }

    return '/signin';
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col justify-items-start space-y-4"
      >
        <div className="self-center">
          <Logo height={22} width={180} logoVariant="navigation" logoSize="default" />
        </div>
        <h1 className="self-center text-2xl font-semibold">Регистрация</h1>
        <FormField
          control={control}
          name="username"
          defaultValue=""
          render={({ field }) => (
            <FormItem className="pt-4">
              <FormLabel htmlFor="user name">Имя пользователя</FormLabel>
              <FormControl>
                <Input
                  error={!!errors?.username}
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
        <div className="flex h-full w-full items-end justify-between">
          <div className="flex h-[48px] items-center">
            <Link size="l" theme="brand" variant="hover" href={getSigninHref()}>
              Войти
            </Link>
          </div>
          {isButtonActive ? (
            <Button size="m" variant="default" type="submit" className="w-[214px]">
              Зарегистрироваться
            </Button>
          ) : (
            <Button variant="default-spinner" className="w-[214px]" disabled />
          )}
        </div>
      </form>
    </Form>
  );
};
