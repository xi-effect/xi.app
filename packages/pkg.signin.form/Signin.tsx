'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@xipkg/button';
import { Input } from '@xipkg/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@xipkg/form';
import { useRouter } from 'next/navigation';

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

const FormSchema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export const SignIn = ({ signIn, onSignIn }: SignInT) => {
  const router = useRouter();
  const redirectFn = (url: string) => router.push(url);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    onSignIn({ ...data, redirectFn });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-fill space-y-2">
        <FormField
          control={form.control}
          name="email"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input autoComplete="on" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input autoComplete="on" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="default" type="submit">
          Войти
        </Button>
      </form>
    </Form>
  );
};
