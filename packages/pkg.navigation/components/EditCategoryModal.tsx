import React from 'react';
import * as M from '@xipkg/modal';
import { Button } from '@xipkg/button';
import { Close } from '@xipkg/icons';
import { Form, FormControl, FormField, FormItem, FormLabel, useForm } from '@xipkg/form';
import { Input } from '@xipkg/input';
import { PrivateCategoryToggle } from './PrivateCategoryToggle';
import { CategoryT } from './types';

export type EditCategoryModalPropsT = {
  isOpen: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
  onConfirm: (value: CategoryT & { privateCategory: boolean }) => void;
  category: CategoryT;
};

type EditCategoryFormT = {
  name: string;
  description: string;
  privateCategory: boolean;
};

export const EditCategoryModal = ({
  isOpen,
  onConfirm,
  onOpenChange,
  category,
}: EditCategoryModalPropsT) => {
  const form = useForm({
    defaultValues: {
      name: category.name || '',
      description: category.description || '',
      privateCategory: false,
    },
  });
  const { control, handleSubmit, trigger } = form;

  const onSubmit = async (data: EditCategoryFormT) => {
    trigger();
    onConfirm({
      ...category,
      name: data.name,
      description: data.description,
      privateCategory: data.privateCategory,
    });
    onOpenChange(false);
  };

  return (
    <M.Modal open={isOpen} onOpenChange={() => onOpenChange(!isOpen)}>
      <M.ModalContent>
        <M.ModalCloseButton>
          <Close className="fill-gray-80 sm:fill-gray-0" />
        </M.ModalCloseButton>
        <M.ModalHeader>
          <M.ModalTitle>Редактирование категории</M.ModalTitle>
        </M.ModalHeader>
        <Form {...form}>
          <form id="edit-channel-form" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 p-4">
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
                <FormItem className="flex flex-col gap-2 p-4">
                  <FormLabel>Подзаголовок</FormLabel>
                  <FormControl>
                    <Input placeholder="Advanced" type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="privateCategory"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 p-4">
                  <FormControl>
                    <PrivateCategoryToggle
                      checked={field.value}
                      onChange={(value: boolean) => field.onChange(value)}
                    />
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
