'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@xipkg/button';
import { Input } from '@xipkg/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@xipkg/form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@xipkg/link';

export type SignInT = {
  /**
   * The store type is the store itself.
   */
  signIn: any;
  onSignIn: any;
};

const FormSchema = z
  .object({
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
  })
  .required();

export const SignIn = ({ signIn, onSignIn }: SignInT) => {
  const router = useRouter();
  const redirectFn = (url: string) => router.push(url);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  console.log('form', form);
  console.log('errors', form.formState.errors);

  const { setError } = form;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log('data', data);
    form.trigger();
    onSignIn({ ...data, redirectFn, setError });
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
        <h1 className="self-center text-2xl font-semibold">Вход в аккаунт</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="pt-4">
              <FormLabel>Электронная почта</FormLabel>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  error={!!form.formState.errors?.password}
                  autoComplete="on"
                  type="password"
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
        <div className="flex w-full h-full justify-between items-end">
          <div className="flex h-[56px] items-center">
            <Link size="l" theme="brand" variant="hover" href="/signup">
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
