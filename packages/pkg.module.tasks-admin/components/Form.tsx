'use client';

import { Form, FormControl, FormField, FormItem, FormMessage, useForm } from '@xipkg/form';
import { Input } from '@xipkg/input';
import { Calendar } from '@xipkg/icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@xipkg/select';

import { Button } from '@xipkg/button';
import { DatePicker } from '@xipkg/datepicker';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { gradingModels } from '../consts';

import { TimeInput } from './TimeInput ';

type FormPropsT = {
  timer: boolean;
};

const FormSchema = z
  .object({
    openDate: z.date({ required_error: 'Обязательное поле' }),
    openTime: z.string({ required_error: 'Обязательное поле' }),
    closeDate: z.date({ required_error: 'Обязательное поле' }),
    closeTime: z.string({ required_error: 'Обязательное поле' }),
    pointSystem: z.string({ required_error: 'Обязательное поле' }),
  })
  .refine(
    (data) => {
      const openDateTime = new Date(`${data.openDate.toDateString()} ${data.openTime}`);
      const closeDateTime = new Date(`${data.closeDate.toDateString()} ${data.closeTime}`);
      return openDateTime.getTime() !== closeDateTime.getTime();
    },
    {
      message: 'Время открытия и закрытия задания не могут совпадать',
      path: ['dateConflict'], // специальный путь для ошибки совпадения дат
    },
  );

export type FormDataT = {
  openDate: Date;
  openTime: string;
  closeDate: Date;
  closeTime: string;
  pointSystem: string;
  dateConflict?: string;
};

export const FormBlock = ({ timer }: FormPropsT) => {
  const form = useForm<FormDataT>({
    resolver: zodResolver(FormSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = () => {
    toast('Задание создано');
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="border-gray-30 rounded-xl border p-6">
        <h2 className="text-l-base font-semibold text-gray-100">Настройки</h2>

        <div className="mt-6 flex-col">
          <p className="text-m-base font-medium text-gray-100">Дата открытия</p>
          <p className="text-s-base text-gray-40 mt-1">Когда задание станет доступно студентам</p>

          <div className="flex items-end justify-between gap-2">
            <FormField
              control={control}
              name="openDate"
              render={({ field }) => (
                <FormItem className="mt-2 w-full">
                  <FormControl>
                    <DatePicker mode="single" selected={field.value} onSelect={field.onChange}>
                      <Input
                        value={field.value ? format(field.value, 'PPP', { locale: ru }) : ''}
                        variant="m"
                        className="cursor-pointer justify-start text-left font-normal"
                        after={<Calendar className="fill-gray-60 h-6 w-6" />}
                      />
                    </DatePicker>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="openTime"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormControl>
                    <TimeInput time={field.value} setTime={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-6 flex-col">
          <p className="text-m-base font-medium text-gray-100">Дата закрытия</p>
          <p className="text-s-base text-gray-40 mt-1">
            Когда задание перестанет быть доступным студентам
          </p>

          <div className="flex items-end justify-between gap-2">
            <FormField
              control={control}
              name="closeDate"
              render={({ field }) => (
                <FormItem className="mt-2 w-full">
                  <FormControl>
                    <DatePicker mode="single" selected={field.value} onSelect={field.onChange}>
                      <Input
                        value={field.value ? format(field.value, 'PPP', { locale: ru }) : ''}
                        variant="m"
                        className="cursor-pointer justify-start text-left font-normal"
                        after={<Calendar className="fill-gray-60 h-6 w-6" />}
                      />
                    </DatePicker>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="closeTime"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormControl>
                    <TimeInput time={field.value} setTime={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {errors.dateConflict && (
            <p className="text-red-80 w-full pt-1 text-[12px] font-normal">
              {errors.dateConflict.message}
            </p>
          )}
        </div>

        <div className="mt-6 flex-col">
          <p className="text-m-base font-medium text-gray-100">Модель оценивания</p>
          <div className="flex items-end justify-between gap-2">
            <FormField
              control={control}
              name="pointSystem"
              render={({ field }) => (
                <FormItem className="mt-2 w-full">
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Модель оценивания" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(gradingModels).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            className="2xl:text-l-base w-1/2 text-base font-normal 2xl:font-medium"
          >
            Отменить
          </Button>
          <Button
            disabled={timer}
            className="2xl:text-l-base w-1/2 text-base font-normal disabled:cursor-not-allowed 2xl:font-medium"
            type="submit"
          >
            Опубликовать
          </Button>
        </div>
      </form>
    </Form>
  );
};
