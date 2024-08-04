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
import { Button } from '@xipkg/button';
import { toast } from 'sonner';
import * as M from '@xipkg/modal';
import Timer from './Timer';

const schema = z.object({
  email: z
    .string({ required_error: 'Обязательное поле' })
    .email({ message: 'Некорректный формат данных' }),
  password: z.string({ required_error: 'Обязательное поле' }).min(6, {
    message: 'Минимальная длина пароля - 6 символов',
  }),
});

type FormBlockPropsT = {
  onEmailChange: any;
  setStage: (arg: { type: string; email: string }) => void;
};

export type FormDataT = {
  email: string;
  password: string;
};

const FormBlock = ({ onEmailChange, setStage }: FormBlockPropsT) => {
  const form = useForm<FormDataT>({
    resolver: zodResolver(schema),
  });

  const [isPasswordShow, setIsPasswordShow] = React.useState(false);
  const [timer, setTimer] = useState(false);
  const changePasswordShow = () => {
    setIsPasswordShow((prev) => !prev);
  };

  const {
    control,
    handleSubmit,
    trigger,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormDataT) => {
    trigger();
    const status = await onEmailChange({ ...data, setError });
    if (status === 200) {
      setStage({ type: 'success', email: data.email });
      toast('Вы успешно изменили почту!');
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 px-5 pt-5 pb-3">
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Новый адрес электронной почты</FormLabel>
                <FormControl className="mt-2">
                  <Input {...field} error={!!errors.email} autoComplete="on" />
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
                <FormControl className="mt-2">
                  <Input
                    {...field}
                    error={!!errors?.password}
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
        </div>
        <M.ModalFooter className="flex justify-start gap-4 px-5 py-5">
          <Button disabled={timer} className="disabled:cursor-not-allowed" type="submit">
            Изменить
          </Button>
          <Button type="button" variant="secondary">
            Отменить
          </Button>
        </M.ModalFooter>
      </form>
    </Form>
  );
};

export default FormBlock;
