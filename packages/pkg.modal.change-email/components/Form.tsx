'use client';

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
import { useState } from 'react';
import * as z from 'zod';
import Timer from './Timer';

const schema = z.object({
  email: z
    .string({ required_error: 'Обязательное поле' })
    .email({ message: 'Некорректный формат данных' }),
  password: z.string({ required_error: 'Обязательное поле' }),
});

const FormBlock = () => {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const { control } = form;

  const [timer, setTimer] = useState(false);

  return (
    <Form {...form}>
      <form className="space-y-4 p-6 pt-5" onSubmit={form.handleSubmit(console.log)}>
        {timer && (
          <Timer
            durationSecs={10 * 60}
            getTitle={(t) => `Отправить повторно можно через ${t}`}
            onTimerEnd={() => setTimer(false)}
          />
        )}
        <FormField
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
