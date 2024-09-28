'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { put } from 'pkg.utils';
import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';
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
import { Eyeoff, Eyeon } from '@xipkg/icons';
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

type FormPropsT = {
  setStage: (stage: 'form' | 'success') => void;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormBlock = ({ setStage, onOpenChange }: FormPropsT) => {
  const updateUserInfo = useMainSt((state) => state.updateUser);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const { control, handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const { currentPassword, newPassword } = data;

    const { status, data: responseData } = await put<
      { password: string; new_password: string },
      any
    >({
      service: 'auth',
      path: '/api/users/current/password/',
      body: {
        password: currentPassword,
        new_password: newPassword,
      },
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    if (status === 200) {
      toast('Пароль успешно изменен');
      setStage('success');
      updateUserInfo({ lastPasswordChange: responseData.last_password_change });
    } else if (responseData.detail === 'Wrong password') {
      toast('Неверный пароль');
    } else {
      toast('Произошла ошибка');
    }
  };

  const [isPasswordShow, setIsPasswordShow] = React.useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const changePasswordShow = (fieldId: keyof typeof isPasswordShow) => {
    setIsPasswordShow((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 px-5 pb-3 pt-5">
          <FormField
            control={control}
            name="currentPassword"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Текущий пароль</FormLabel>
                <FormControl className="mt-2">
                  <Input
                    {...field}
                    error={!!error}
                    autoComplete="off"
                    type={isPasswordShow.currentPassword ? 'text' : 'password'}
                    afterClassName="cursor-pointer"
                    after={
                      isPasswordShow.currentPassword ? (
                        <Eyeoff className="fill-gray-60" />
                      ) : (
                        <Eyeon className="fill-gray-60" />
                      )
                    }
                    afterProps={{
                      onClick: () => changePasswordShow('currentPassword'),
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="newPassword"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Новый пароль</FormLabel>
                <FormControl className="mt-2">
                  <Input
                    {...field}
                    error={!!error}
                    autoComplete="off"
                    type={isPasswordShow.newPassword ? 'text' : 'password'}
                    afterClassName="cursor-pointer"
                    after={
                      isPasswordShow.newPassword ? (
                        <Eyeoff className="fill-gray-60" />
                      ) : (
                        <Eyeon className="fill-gray-60" />
                      )
                    }
                    afterProps={{
                      onClick: () => changePasswordShow('newPassword'),
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Подтвердите пароль</FormLabel>
                <FormControl className="mt-2">
                  <Input
                    {...field}
                    error={!!error}
                    autoComplete="off"
                    type={isPasswordShow.confirmPassword ? 'text' : 'password'}
                    afterClassName="cursor-pointer"
                    after={
                      isPasswordShow.confirmPassword ? (
                        <Eyeoff className="fill-gray-60" />
                      ) : (
                        <Eyeon className="fill-gray-60" />
                      )
                    }
                    afterProps={{
                      onClick: () => changePasswordShow('confirmPassword'),
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="border-gray-20 flex justify-start gap-4 border-t p-6 px-5 py-5">
          <Button type="submit">Изменить</Button>
          <Button onClick={() => onOpenChange(false)} variant="secondary">
            Отменить
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormBlock;
