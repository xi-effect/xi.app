// @ts-nocheck
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@xipkg/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@xipkg/form';
import { Link } from '@xipkg/link';
import Image from 'next/image';
import { UseFormSetError, useForm } from 'react-hook-form';
import * as z from 'zod';
import PasswordInput from './PasswordInput';

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

export type NewPasswordT = {
  onNewPassword: (data: FormSchemaT & { setError: UseFormSetError<FormSchemaT> }) => void;
};

export const NewPassword = (props: NewPasswordT) => {
  const form = useForm<FormSchemaT>({
    resolver: zodResolver(FormSchema),
  });

  const { control, setError, handleSubmit, trigger } = form;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    trigger();
    const status = props.onNewPassword({ ...data, setError });
  };

  return (
    //@ts-ignore
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
        <h1 className="self-center text-2xl font-semibold">Сброс пароля</h1>
        <FormField
          //@ts-ignore
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="pt-4">
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <PasswordInput {...field} error={!!error?.message} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          //@ts-ignore
          control={control}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <PasswordInput {...field} error={!!error?.message} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full h-full justify-between items-end">
          <div className="flex h-[56px] items-center">
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

export default NewPassword;
