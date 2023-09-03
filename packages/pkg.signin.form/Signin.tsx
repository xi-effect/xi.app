'use client';

import * as React from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, Link } from '@mui/material';
import { Input } from '@xipkg/input';

type FormValues = {
  email: string;
  password: string;
};

export type SignInT = {
  /**
   * The store type is the store itself.
   */
  signIn: any;
  onSignIn: any;
};

const schema = yup
  .object({
    email: yup.string().email().max(100).required(),
    password: yup.string().required().min(6).max(100),
  })
  .required();

export const SignIn = ({ signIn, onSignIn }: SignInT) => {
  console.log('signInSt', signIn);

  const { errorEmail, errorPassword } = signIn;

  const router = useRouter();

  // const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    trigger();
    onSignIn(data, trigger);
  };

  // const getEmailError = () => {
  //   if (errors.email?.message) return "Некорректный email";
  //   if (errorEmail) return "Не удалось найти аккаунт";
  //   return null;
  // };

  // const getPasswordError = () => {
  //   if (errors.email || errorPassword) return "Неправильный пароль";
  //   return null;
  // };

  return (
    <Stack
      height="100%"
      direction="column"
      justifyContent="space-between"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction="column" spacing={2}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              error={!!errors.email?.message || !!errorEmail}
              type="email"
              fullWidth
              placeholder="Электронная почта"
              autoComplete="on"
              {...field}
              sx={{
                backgroundColor: 'petersburg.0',
              }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              error={!!errors.password?.message || !!errorPassword}
              fullWidth
              placeholder="Пароль"
              autoComplete="on"
              // type={showPassword ? 'text' : 'password'}
              {...field}
            />
          )}
        />
        <Link
          underline="none"
          sx={{
            cursor: 'pointer',
            color: 'brand.80',
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '18px',
            letterSpacing: 0,
          }}
          onClick={() => router.push('/resetpassword/email')}
        >
          Восстановить пароль
        </Link>
      </Stack>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Link
          underline="none"
          sx={{
            cursor: 'pointer',
            color: 'brand.80',
            fontWeight: 500,
            fontSize: 16,
            lineHeight: '20px',
            letterSpacing: 0,
          }}
          onClick={() => router.push('/signup')}
        >
          Регистрация
        </Link>
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: '120px',
            height: '48px',
            borderRadius: '8px',
            fontWeight: 500,
            fontSize: 18,
            lineHeight: '22px',
            textTransform: 'capitalize',
          }}
        >
          Войти
        </Button>
      </Stack>
    </Stack>
  );
};
