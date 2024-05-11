'use client';

import React from 'react';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
// import { useSocketIO } from 'pkg.utils';

// type FormCreateProps = {
//   onOpenChange: (value: boolean) => void;
// };

const FormSchema = z.object({
  name: z.string({
    required_error: 'Обязательное поле',
  }),
});

const FormCreateBlock = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  });
  const { control } = form;

  const socket = useMainSt((state) => state.socket);

  const router = useRouter();

  const onSubmit = ({ name }: z.infer<typeof FormSchema>) => {
    socket.emit(
      'create-community',
      {
        data: {
          name,
        },
      },
      (status: number, data: any) => {
        console.log('on data', status, data);
        if (status === 200) {
          router.push(`/communities/${data.id}/home`);
        } else {
          toast('Ошибка при создании сообщества');
        }
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6 pt-5">
        <FormField
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl className="mt-2">
                <Input {...field} error={!!error} autoComplete="off" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-6 w-full" type="submit">
          Создать
        </Button>
      </form>
    </Form>
  );
};

export default FormCreateBlock;
