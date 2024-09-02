/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import * as M from '@xipkg/modal';
import { Button } from '@xipkg/button';
import { Close } from '@xipkg/icons';
import { Form, FormControl, FormField, FormItem, FormLabel, useForm } from '@xipkg/form';
import { Input } from '@xipkg/input';
import { ChannelT } from '../types';

export type EditChannelModalPropsT = {
  isOpen: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
  onConfirm: (value: ChannelT) => void;
  channel: ChannelT;
};

type EditChannelFormT = {
  name: string;
};

export const EditChannelModal = ({
  isOpen,
  onConfirm,
  onOpenChange,
  channel,
}: EditChannelModalPropsT) => {
  const form = useForm({
    defaultValues: {
      name: channel.name || '',
    },
  });
  const { control, handleSubmit, trigger } = form;

  const onSubmit = async (data: EditChannelFormT) => {
    trigger();
    onConfirm({ ...channel, name: data.name });
    onOpenChange(false);
  };

  return (
    <M.Modal open={isOpen} onOpenChange={onOpenChange}>
      <M.ModalContent>
        <M.ModalCloseButton>
          <Close className="fill-gray-80 sm:fill-gray-0" />
        </M.ModalCloseButton>
        <M.ModalHeader>
          <M.ModalTitle>Редактирование канала</M.ModalTitle>
        </M.ModalHeader>
        <Form {...form}>
          <form id="edit-channel-form" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 p-6">
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <M.ModalFooter className="flex items-center justify-start gap-4">
          <Button form="edit-channel-form" type="submit" className="w-full">
            Сохранить
          </Button>
        </M.ModalFooter>
      </M.ModalContent>
    </M.Modal>
  );
};
