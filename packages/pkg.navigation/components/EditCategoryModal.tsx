import React from 'react';
import * as M from '@xipkg/modal';
import { Button } from '@xipkg/button';
import { Close } from '@xipkg/icons';
import { Form, FormControl, FormField, FormItem, FormLabel, useForm } from '@xipkg/form';
import { Input } from '@xipkg/input';

export type EditCategoryModalPropsT = {
  isOpen: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
  onConfirm: (value: any) => void;
  category: any;
};

export const EditCategoryModal = ({ isOpen, onConfirm, onOpenChange, category }: any) => {
  const form = useForm({
    defaultValues: {
      name: category.name || '',
      description: category.description || '',
    },
  });
  const { control, handleSubmit, trigger } = form;

  const onSubmit = async (data: any) => {
    trigger();
    onConfirm({ ...category, name: data.name, description: data.description });
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
                    <Input placeholder="C1" type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 p-6">
                  <FormLabel>Подзаголовок</FormLabel>
                  <FormControl>
                    <Input placeholder="Advanced" type="text" {...field} />
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
