'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from '@xipkg/form';
import { Input } from '@xipkg/input';
import * as z from 'zod';

const schema = z.object({
  currentPassword: z.string({ required_error: 'Обязательное поле' }),
  password: z.string({ required_error: 'Обязательное поле' }),
  confirmPassword: z.string({ required_error: 'Обязательное поле' }),
});

interface FormBlockProps {}

const FormBlock = (props: FormBlockProps) => {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const { control } = form;

  return (
    <Form {...form}>
      <form className="p-6 pt-5 space-y-4" onSubmit={form.handleSubmit(console.log)}>
        <FormField
          control={control}
          name="currentPassword"
          render={({ fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Текущий пароль</FormLabel>
              <FormControl className="mt-2">
                <Input error={!!error} autoComplete="off" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Новый пароль</FormLabel>
              <FormControl className="mt-2">
                <Input error={!!error} autoComplete="off" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="confirmPassword"
          render={({ fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl className="mt-2">
                <Input error={!!error} autoComplete="off" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FormBlock;
