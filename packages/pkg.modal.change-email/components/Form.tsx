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
import { Eyeoff, Eyeon } from '@xipkg/icons';
import React, { useState } from 'react';
import * as z from 'zod';
import Timer from './Timer';
import { Button } from '@xipkg/button';
import * as M from '@xipkg/modal';

const schema = z.object({
  email: z
    .string({ required_error: 'Обязательное поле' })
    .email({ message: 'Некорректный формат данных' }),
  password: z.string({ required_error: 'Обязательное поле' }),
});

interface IFormBlockProps {
  handleFormState: any;
  // (arg: { type: 'success' | 'form'; email: string }) => void
}

type FormDataT = {
  email: string;
  password: string;
};

const FormBlock = ({ handleFormState }: IFormBlockProps) => {
  const [isPasswordShow, setIsPasswordShow] = React.useState(false);

  const changePasswordShow = () => {
    setIsPasswordShow((prev) => !prev);
  };

  const form = useForm<FormDataT>({
    resolver: zodResolver(schema),
  });
  const { control, handleSubmit, register } = form;

  const [timer, setTimer] = useState(false);

  const onSubmit = (data: FormDataT) => {
    console.log(data); // Check if form data is being captured correctly
    handleFormState({ type: 'success', email: data.email });
  };

  return (
    <Form {...form}>
      <form className="space-y-4 p-6 pt-5" onSubmit={handleSubmit(onSubmit)}>
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
                <Input {...register('email')} error={!!error} autoComplete="on" />
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
                <Input
                  {...register('password')}
                  error={!!error}
                  autoComplete="off"
                  afterClassName="cursor-pointer"
                  type={isPasswordShow ? 'text' : 'password'}
                  after={isPasswordShow ? <Eyeoff /> : <Eyeon />}
                  afterProps={{
                    onClick: changePasswordShow,
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <M.ModalFooter className="flex justify-end gap-4">
          <Button variant={'secondary'}>Отменить</Button>
          <Button type="submit">Изменить</Button>
        </M.ModalFooter>
      </form>
    </Form>
  );
};

export default FormBlock;
