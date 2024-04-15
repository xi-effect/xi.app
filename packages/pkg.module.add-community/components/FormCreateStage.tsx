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

// type FormCreateProps = {
//   onOpenChange: (value: boolean) => void;
// };

const FormCreateBlock = () => {
  const form = useForm({
    defaultValues: {
      name: '',
    },
  });
  const { control } = form;

  return (
    <Form {...form}>
      <form className="space-y-4 p-6 pt-5">
        <FormField
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl className="mt-2">
                <Input {...field} error={!!error} autoComplete="off" type="text" {...field} />
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
