'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@xipkg/form';
import { Input } from '@xipkg/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Timer from './Timer';

const schema = z.object({
  email: z
    .string({ required_error: 'Обязательное поле' })
    .email({ message: 'Некорректный формат данных' }),
  password: z.string({ required_error: 'Обязательное поле' }),
});

interface FormBlockProps {}

const FormBlock = (props: FormBlockProps) => {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const { control } = form;

  const [timer, setTimer] = useState(false);

  return (
    <Form {...(form as any)}>
      <form className="p-6 pt-5 space-y-4" onSubmit={form.handleSubmit(console.log)}>
        {true && (
          <Timer
            durationSecs={10 * 60}
            getTitle={(t) => `Отправить повторно можно через ${t}`}
            onTimerEnd={() => setTimer(false)}
          />
        )}
        <FormField
          // @ts-ignore
          control={control}
          name="email"
          render={({ fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Новый адрес электронной почты</FormLabel>
              <FormControl className="mt-2">
                <Input error={!!error} autoComplete="on" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          // @ts-ignore
          control={control}
          name="password"
          render={({ fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
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
