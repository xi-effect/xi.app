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
import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';
import { Header } from '../Header';
import { useInterfaceStore } from '../../interfaceStore';

const FormSchema = z.object({
  name: z.string({
    required_error: 'Обязательное поле',
  }),
});

export const Main = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const setIsCloseActive = useInterfaceStore((state) => state.setIsCloseActive);
  const communityName = useMainSt((state) => state.communityMeta.name);
  const communityId = useMainSt((state) => state.communityMeta.id);
  const socket = useMainSt((state) => state.socket);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: communityName || '',
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
    if (data.name !== communityName) {
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

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    socket.emit(
      'update-community',
      {
        community_id: communityId,
        data: {
          description: null,
          name: data.name,
        },
      },
      (status: number) => {
        if (status === 200) {
          updateCommunityMeta({ name: data.name });
          setIsCloseActive(true);
          closeSnackbar();
          toast('Название сообщество сохранено');
        }
      },
    );
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
