'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@xipkg/form';
import { Input } from '@xipkg/input';
import { Button } from '@xipkg/button';
import * as z from 'zod';

const schema = z
  .object({
    currentPassword: z.string({ required_error: 'Обязательное поле' }),
    newPassword: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
    confirmPassword: z.string().min(1, { message: 'Обязательное поле' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

type FormCreateProps = {
  onOpenChange: (value: boolean) => void;
};

const FormCreateBlock = ({ onOpenChange }: FormCreateProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const { control } = form;

  return (
    <Form {...form}>
      <form className="space-y-4 p-6 pt-5">
        <FormField
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl className="mt-2">
                <Input {...field} error={!!error} autoComplete="off" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-6" type="submit">Создать</Button>
      </form>
    </Form>
  );
};

export default FormCreateBlock;
