'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@xipkg/button';
import { Input } from '@xipkg/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm
} from '@xipkg/form';
import Image from 'next/image';
import { Link } from '@xipkg/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { post } from 'pkg.utils';

const FormSchema = z.object({
  email: z
    .string({
      required_error: 'Обязательное поле',
    })
    .email({
      message: 'Некорректный формат данных',
    }),
});

export const ResetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  const sendEmail = async ({ email }: z.infer<typeof FormSchema>) => {
    const { data } = await post({
      service: 'auth',
      path: '/password-reset/',
      body: {
        email: email.toLowerCase(),
      },
    });
    // @ts-ignore
    if (data && data.a) {
      setEmailSent(true);
    } else {
      setError('email', { type: 'user', message: 'Не удалось найти аккаунт' });
    }
  };
  const { setError } = form;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    form.trigger();
    sendEmail(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
        <h1 className="self-center text-2xl font-semibold">
          {emailSent ? 'Письмо отправлено' : 'Восстановление'}
        </h1>
        {emailSent ? (
          <div className="pt-4 w-full xs:w-[80%] m-auto text-center">
            Ссылка на восстановление пароля отправлена на {form.getValues().email}
          </div>
        ) : (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="pt-4">
                <FormLabel>Электронная почта</FormLabel>
                <FormDescription className="mb-2">
                  Введите адрес, привязанный к аккаунту
                </FormDescription>
                <FormControl>
                  <Input
                    error={!!form.formState.errors?.email}
                    autoComplete="on"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex w-full h-full justify-between items-end">
          <div className="flex h-[56px] items-center">
            {emailSent ? (
              <Link
                size="l"
                theme="brand"
                variant="hover"
                onClick={() => sendEmail(form.getValues())}
                href={''}
              >
                Отправить ещё раз
              </Link>
            ) : (
              <Link size="l" theme="brand" variant="hover" href="/">
                Войти
              </Link>
            )}
          </div>
          {emailSent ? (
            <Button onClick={() => router.push('/signin')}>Войти</Button>
          ) : (
            <Button type="submit">Отправить</Button>
          )}
        </div>
      </form>
    </Form>
  );
};
