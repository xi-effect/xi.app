'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@xipkg/button';
import { Input } from '@xipkg/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@xipkg/form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@xipkg/link';

type FormValues = {
  email: string;
  password: string;
};

export type SignUpT = {
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

export const SignUp = ({ signIn, onSignIn }: SignUpT) => {
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
        <h1 className="self-center text-2xl font-semibold">Регистрация</h1>
        <FormField
          control={form.control}
          name="email"
          defaultValue=""
          render={({ field }) => (
            <FormItem className="pt-4">
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input autoComplete="on" type="text" id="user name" {...field} />
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
              <FormLabel>Код-приглашение</FormLabel>
              <FormControl>
                <Input autoComplete="on" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full h-full justify-between items-end">
          <div className="flex h-[56px] items-center">
            <Link size="l" theme="brand" variant="hover" href="/signin">
              Войти
            </Link>
          </div>
          <Button variant="default" type="submit">
            Далее
          </Button>
        </div>
      </form>
    </Form>
  );
};
