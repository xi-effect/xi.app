/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera } from '@xipkg/icons';
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
import { useSnackbar } from 'notistack';
import { Header } from '../Header';
import { useInterfaceStore } from '../../interfaceStore';

const FormSchema = z.object({
  name: z.string({
    required_error: 'Обязательное поле',
  }),
});

const defName = 'тыц';

export const Main = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const setIsCloseActive = useInterfaceStore((state) => state.setIsCloseActive);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: defName,
    },
  });

  const {
    control,
    // setError,
    handleSubmit,
    watch,
    reset,
    // trigger,
    // formState: { errors },
  } = form;

  watch((data) => {
    if (data.name !== defName) {
      setIsCloseActive(false);
      enqueueSnackbar('Your report is ready', {
        variant: 'confirmSave',
        persist: true,
        onReset: () => reset(),
      });
    } else {
      setIsCloseActive(true);
      closeSnackbar();
    }
  });

  const onSubmit = () => {
    console.log('onSubmit');
  };

  return (
    <Form {...form}>
      <Header />
      <div className="border-gray-80 flex h-[120px] w-full rounded-2xl border p-6">
        <button
          type="button"
          className="bg-gray-5 flex h-[72px] w-[72px] place-items-center justify-center rounded-[36px]"
        >
          <Camera size="l" className="fill-gray-60" />
        </button>
        <form
          id="community-settings-main-page-form"
          onSubmit={handleSubmit(onSubmit)}
          className="ml-4 flex flex-col justify-center gap-0.5"
        >
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название сообщества</FormLabel>
                <FormControl className="mt-2">
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </div>
    </Form>
  );
};
