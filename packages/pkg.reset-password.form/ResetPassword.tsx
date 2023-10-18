// @ts-nocheck
'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@xipkg/button';
import { Input } from '@xipkg/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@xipkg/form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@xipkg/link';

export type ResetPasswordT = {
  /**
   * The store type is the store itself.
   */
  onRestorePassword: any;
};

const FormSchema = z.object({
  email: z
    .string({
      required_error: 'Обязательное поле',
    })
    .email({
      message: 'Некорректный формат данных',
    }),
});

export const ResetPassword = ({ onRestorePassword }: ResetPasswordT) => {
  const router = useRouter();
  const redirectFn = (url: string) => router.push(url);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  const { setError } = form;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    form.trigger();
    onRestorePassword({ ...data, redirectFn, setError });
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
        <h1 className="self-center text-2xl font-semibold">Восстановление</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="pt-4">
              <FormLabel>Электронная почта</FormLabel>
              <FormDescription className='mb-2'>Введите адрес, привязанный к аккаунту</FormDescription>
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
        <div className="flex w-full h-full justify-between items-end">
          <div className="flex h-[56px] items-center">
            <Link size="l" theme="brand" variant="hover" href="/signin">
              Войти
            </Link>
          </div>
          <Button variant="default" type="submit">
            Отправить
          </Button>
        </div>
      </form>
    </Form>
  );
};
