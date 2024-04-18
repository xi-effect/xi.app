'use client';

import React from 'react';
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
import { Button } from '@xipkg/button';
import * as z from 'zod';

const schema = z.object({
  link: z.string().url({ message: 'Неправильный формат ссылки' }),
});

type FormJoinProps = {
  setStage: (stage: 'create' | 'join') => void;
  onOpenChange?: (value: boolean) => void;
};

const FormJoinBlock = ({ setStage }: FormJoinProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      link: '',
    },
  });
  const { control } = form;

  return (
    <Form {...form}>
      <form className="space-y-4 p-6 pt-5">
        <FormField
          control={control}
          name="link"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Ссылка-приглашение</FormLabel>
              <FormControl className="mt-2">
                <Input
                  {...field}
                  error={!!error}
                  autoComplete="off"
                  type="text"
                  placeholder="https://xieffect.ru/invite/"
                  className="mb-6"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="border-gray-20 flex flex-col justify-end gap-4 border-t-[1px] pt-6 min-[700px]:flex-row">
          <Button onClick={() => setStage('create')} variant="secondary">
            Отменить
          </Button>
          <Button type="submit" className="order-first min-[700px]:order-last">
            Присоединиться
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormJoinBlock;
