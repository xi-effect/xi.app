/* eslint-disable no-irregular-whitespace */

import React from 'react';
import * as z from 'zod';
import * as M from '@xipkg/modal';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@xipkg/input';
import { Button } from '@xipkg/button';
import { Toggle } from '@xipkg/toggle';
import { Form, FormControl, FormField, FormItem, FormLabel, useForm } from '@xipkg/form';

const FormSchema = z.object({
  title: z.string().min(1, { message: 'Поле не должно быть пустым' }),
  subtitle: z.string(),
  isPrivate: z.boolean().default(false),
});

type FormSchemaT = z.infer<typeof FormSchema>;

export default function FormBlock() {
  const form = useForm<FormSchemaT>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      isPrivate: false,
    },
  });

  function onSubmit(values: FormSchemaT) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6 px-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl className="mt-2">
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подзаголовок</FormLabel>
                <FormControl className="mt-2">
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="bg-gray-5 flex items-center justify-between rounded-md p-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-100">Приватная категория</h2>
              <p className="text-gray-80 mt-2 text-base font-normal">
                Контент в данной категории будет доступен только выбранным классам и ролям
              </p>
            </div>
            <FormField
              control={form.control}
              name="isPrivate"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Toggle
                      size="l"
                      checked={form.getValues('isPrivate')}
                      onCheckedChange={(isChecked) => form.setValue('isPrivate', isChecked)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <M.ModalFooter className="mt-6">
          <Button className="w-full" type="submit">
            Создать
          </Button>
        </M.ModalFooter>
      </form>
    </Form>
  );
}
