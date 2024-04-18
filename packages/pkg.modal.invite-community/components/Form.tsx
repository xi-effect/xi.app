import { useState } from 'react';

import * as z from 'zod';
import * as M from '@xipkg/modal';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@xipkg/input';
import { Button } from '@xipkg/button';
import { Calendar, Plus } from '@xipkg/icons';
import { DatePicker } from '@xipkg/datepicker';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  useForm,
} from '@xipkg/form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';

const FormSchema = z.object({
  maxUsageCount: z.string(),
  date: z.string().datetime({ offset: true }).nullish().or(z.string().max(0)),
  roles: z.array(z.string()),
});

export default function FormBlock() {
  // Временный список ролей
  const rolesTemplate = [
    { name: 'Администратор', bgColorMain: 'bg-violet-100', bgColorSecondary: 'bg-violet-20' },
    { name: 'Преподаватель', bgColorMain: 'bg-brand-100', bgColorSecondary: 'bg-brand-0' },
    { name: 'Студент', bgColorMain: 'bg-green-100', bgColorSecondary: 'bg-green-0' },
    { name: 'Гость', bgColorMain: 'bg-red-100', bgColorSecondary: 'bg-red-0' },
    { name: '1', bgColorMain: 'bg-gray-80', bgColorSecondary: 'bg-gray-5' },
    { name: '2', bgColorMain: 'bg-gray-80', bgColorSecondary: 'bg-gray-5' },
  ];

  const [date, setDate] = useState<Date>();
  const [unusedRoles, setUnusedRoles] = useState<typeof rolesTemplate>(rolesTemplate);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      maxUsageCount: '',
      date: '',
      roles: [],
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-6 px-6">
          <FormField
            name="maxUsageCount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Максимальное число использований</FormLabel>
                <FormDescription className="text-sm">
                  Для приглашения без ограничения оставить пустым
                </FormDescription>
                <FormControl className="mt-2">
                  <Input
                    placeholder="от 1 до 99"
                    {...field}
                    max={99}
                    maxLength={2}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const onlyNumbers = inputValue.replace(/[^1-9]/g, ''); // Можно вводить только цифры

                      form.setValue('maxUsageCount', onlyNumbers);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ограничение по времени</FormLabel>
                <FormDescription className="text-sm">
                  Для приглашения без ограничения оставить пустым
                </FormDescription>
                <FormControl>
                  <DatePicker
                    popoverProps={{ modal: true }}
                    popoverTriggerProps={{}}
                    popoverContentProps={{}}
                    mode="single"
                    className="mt-2"
                    selected={date}
                    onSelect={(selectedDate: Date | undefined) => {
                      if (selectedDate) {
                        form.setValue(
                          'date',
                          format(selectedDate, "yyyy-MM-dd'T'HH:mm:ssxxx", { locale: ru }),
                        );
                        setDate(selectedDate);
                      }
                    }}
                  >
                    <Input
                      className="cursor-pointer"
                      {...field}
                      value={
                        form.getValues('date')
                          ? format((form.getValues('date') ?? '').toString(), 'PPP', { locale: ru })
                          : ''
                      }
                      after={<Calendar className="fill-gray-60 h-6 w-6" />}
                    />
                  </DatePicker>
                </FormControl>
                <Button
                  type="reset"
                  onClick={() => form.resetField('date')}
                  className="text-gray-60 h-min w-min rounded-none bg-transparent p-0 text-xs hover:bg-transparent hover:underline focus:bg-transparent active:bg-transparent"
                >
                  Очистить
                </Button>
              </FormItem>
            )}
          />
          <FormField
            name="roles"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Роли</FormLabel>
                <div className="relative">
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Input
                          placeholder="Выберите роль"
                          className="text-gray-0 cursor-pointer"
                          {...field}
                          after={
                            <Plus className="bg-brand-80 fill-gray-0 absolute right-0 h-6 w-6 rounded-lg p-1" />
                          }
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {unusedRoles.map((roleTemplate, index) => (
                          <DropdownMenuItem
                            key={index}
                            className="hover:bg-gray-10 rounded-lg"
                            onClick={() => {
                              form.setValue('roles', [
                                ...form.getValues('roles'),
                                roleTemplate.name,
                              ]);
                              setUnusedRoles(unusedRoles.filter((role) => role !== roleTemplate));
                            }}
                          >
                            <span
                              className={`bg mr-2 size-3 rounded-full ${roleTemplate.bgColorMain}`}
                            />
                            <p>{roleTemplate.name}</p>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  {form.getValues('roles').length > 0 && (
                    <ul className="pointer-events-none absolute inset-0 z-50 flex h-full w-full items-center gap-2 px-3 pr-11">
                      {form.getValues('roles').map((role, index) => (
                        <li
                          key={index}
                          className="bg-gray-5 flex items-center gap-2 rounded-md px-2 py-1 text-xs"
                        >
                          <span className="bg-gray-80 inline-block size-3 rounded-full" />
                          {role}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Button
                  type="reset"
                  onClick={() => {
                    form.resetField('roles');
                    setUnusedRoles(rolesTemplate);
                  }}
                  className="text-gray-60 h-min w-min rounded-none bg-transparent p-0 text-xs hover:bg-transparent hover:underline focus:bg-transparent active:bg-transparent"
                >
                  Очистить
                </Button>
              </FormItem>
            )}
          />
        </div>
        <M.ModalFooter className="flex justify-end gap-4">
          <Button variant="secondary" className="h-12 px-6" type="button">
            Отменить
          </Button>
          <Button className="h-12 px-6" type="submit">
            Создать
          </Button>
        </M.ModalFooter>
      </form>
    </Form>
  );
}
