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
import { useTheme } from 'next-themes';

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

const InvitationMessage = ({ communityName }: { communityName: string }) => (
  <div className="bg-bkgd-main rounded-lg p-4">
    <p className="text-brand-100 text-sm">
      Вы были приглашены в сообщество «{communityName}». Для того, чтобы продолжить, авторизуйтесь
      или зарегистрируйтесь.
    </p>
  </div>
);

export const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const communityName = searchParams.get('community');

  const onSignIn = useMainSt((state) => state.onSignIn);

  const { setTheme } = useTheme();

  const form = useForm<z.infer<typeof FormSchema>>({
    // @ts-expect-error TODO: Разобраться с типами
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

  const [isButtonActive, setIsButtonActive] = React.useState(true);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    trigger();
    setIsButtonActive(false);
    const answer = await onSignIn({ ...data, setError });

    if (answer.status !== 200) {
      return setIsButtonActive(true);
    }

    if (answer.theme !== null) {
      setTheme(answer.theme);
    }

    if (searchParams.has('iid')) {
      router.push(`/invite/${searchParams.get('iid')}`);
    }

    return router.push('/communities');
  };

  const [isPasswordShow, setIsPasswordShow] = React.useState(false);

  const changePasswordShow = () => {
    setIsPasswordShow((prev) => !prev);
  };

  const getSignupHref = () => {
    if (searchParams.has('iid') && searchParams.get('community')) {
      return `/signup?iid=${searchParams.get('iid')}&community=${searchParams.get('community')}`;
    }

    return '/signup';
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
        <h1 className="self-center text-2xl font-semibold">Вход в аккаунт</h1>
        {communityName && <InvitationMessage communityName={communityName} />}
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
          <div className="flex h-[48px] items-center">
            <Link
              id="to-signup-link"
              data-umami-event="to-signup-link"
              size="l"
              theme="brand"
              variant="hover"
              href={getSignupHref()}
            >
              Зарегистрироваться
            </Link>
          </div>
          {isButtonActive ? (
            <Button variant="default" type="submit" className="w-24">
              Войти
            </Button>
          ) : (
            <Button variant="default-spinner" className="w-24" disabled />
          )}
        </div>
      </form>
    </Form>
  );
};
