'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { Eyeoff, Eyeon } from '@xipkg/icons';
import { Input } from '@xipkg/input';
import { Link } from '@xipkg/link';
import Image from 'next/image';
import React from 'react';
import * as z from 'zod';

const password = z
  .string({
    required_error: 'Обязательное поле',
  })
  .min(1, {
    message: 'Обязательное поле',
  });

const FormSchema = z
  .object({
    password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });
type FormSchemaT = z.infer<typeof FormSchema>;

export const NewPassword = () => {
  const form = useForm<FormSchemaT>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { control, setError, handleSubmit, trigger } = form;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    trigger();
  };

  const [isPasswordShowFirst, setIsPasswordShowFirst] = React.useState(false);
  const [isPasswordShowSecond, setIsPasswordShowSecond] = React.useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col justify-items-start space-y-4"
      >
        <div className="self-center">
          <Image
            height={22}
            width={180}
            alt="xieffect logo"
            src="/assets/brand/navigationlogo.svg"
          />
        </div>
        <h1 className="self-center text-2xl font-semibold">Сброс пароля</h1>
        <FormField
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="pt-4">
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  error={!!error?.message}
                  autoComplete="on"
                  type={isPasswordShowFirst ? 'text' : 'password'}
                  afterClassName="cursor-pointer"
                  after={
                    isPasswordShowFirst ? (
                      <Eyeoff className="fill-gray-60" />
                    ) : (
                      <Eyeon className="fill-gray-60" />
                    )
                  }
                  afterProps={{
                    onClick: () => setIsPasswordShowFirst((p) => !p),
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  error={!!error?.message}
                  autoComplete="on"
                  type={isPasswordShowSecond ? 'text' : 'password'}
                  afterClassName="cursor-pointer"
                  after={
                    isPasswordShowSecond ? (
                      <Eyeoff className="fill-gray-60" />
                    ) : (
                      <Eyeon className="fill-gray-60" />
                    )
                  }
                  afterProps={{
                    onClick: () => setIsPasswordShowSecond((p) => !p),
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex h-full w-full items-end justify-between">
          <div className="flex h-14 items-center">
            <Link
              id="to-signup-link"
              data-umami-event="to-signup-link"
              size="l"
              theme="brand"
              variant="hover"
              href="/signup"
            >
              Войти
            </Link>
          </div>
          <Button variant="default" type="submit">
            Сохранить
          </Button>
        </div>
      </form>
    </Form>
  );
};
