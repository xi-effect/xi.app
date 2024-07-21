import React from 'react';
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@xipkg/select';
import { Breadcrumbs } from '@xipkg/breadcrumbs';
import { Button } from '@xipkg/button';
import { Popover, PopoverContent, PopoverTrigger } from '@xipkg/popover';
import { Plus, Task, TaskFile } from '@xipkg/icons';
import Link from 'next/link';
import { SortValuesT, StatusesT } from '../types';
import { sortValues, statuses } from '../consts';

const breadcrumbs = [
  { name: 'Моё пространство', link: '/home' },
  { name: 'Задания', link: '/tasks' },
];

type HeaderPropsT = {
  onSelect: (status: StatusesT) => void;
  onSort: (task: SortValuesT) => void;
  selectValue: StatusesT;
  sortValue: SortValuesT;
};

const selectItems = [
  { value: statuses.ALL, text: 'все' },
  { value: statuses.ACTIVE, text: 'только активные' },
  { value: statuses.CLOSED, text: 'только закрытые' },
];

const sortItems = [
  { value: sortValues.CREATION_DATE, text: 'по дате создания' },
  { value: sortValues.OPENING_DATE, text: 'по дате открытия' },
  { value: sortValues.CLOSING_DATE, text: 'по дате закрытия' },
  { value: sortValues.UNVERIFIED_COUNT, text: 'по количеству непроверенных ответов' },
];

const Header = ({ onSelect, selectValue, onSort, sortValue }: HeaderPropsT) => (
  <div className="flex flex-col gap-4 p-8">
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} size="s" />
    </div>
    <div className="flex flex-col items-baseline gap-4 lg:flex-row lg:items-center">
      <h1 className="text-3xl font-semibold max-[520px]:text-2xl sm:inline-block sm:text-4xl">
        Задания
      </h1>
      <div className="min-w-6 grow" />
      <div className="flex w-full items-start justify-between gap-6 xl:justify-end [@media(max-width:425px)]:flex-col">
        <Select value={selectValue} onValueChange={onSelect}>
          <SelectTrigger className="h-8 w-64 justify-start px-2 py-1 sm:w-72 [&>span]:line-clamp-1 [&>span]:break-all [&>svg]:shrink-0">
            <span className="shrink-0">Показывать: &nbsp; </span>
            <SelectValue />
            <div className="grow" />
          </SelectTrigger>
          <SelectContent className="w-64 sm:w-72">
            {selectItems.map((item, index) => (
              <SelectItem value={item.value} key={index}>
                {item.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortValue} onValueChange={onSort}>
          <SelectTrigger className="flex h-8 w-64 justify-start px-2 py-1 sm:w-72 [&>span]:line-clamp-1 [&>span]:break-all [&>svg]:shrink-0">
            <span className="shrink-0">Сортировка: &nbsp; </span>
            <SelectValue />
            <div className="grow" />
          </SelectTrigger>
          <SelectContent className="w-64 sm:w-72">
            {sortItems.map((item, index) => (
              <SelectItem value={item.value} key={index}>
                {item.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild className="flex items-center gap-1.5">
            <Button size="s" className="md: p-2 leading-5 lg:p-2 xl:pl-2 xl:pr-3">
              <Plus size="s" className="fill-white" />
              <span className="hidden lg:inline">Создать</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="border-gray-10 w-48 p-1 shadow-none">
            <Link href="/" className="flex items-center gap-2 px-3 py-2">
              <Task /> Тест
            </Link>
            <Link href="/" className="flex items-center gap-2 px-3 py-2">
              <TaskFile /> Задание
            </Link>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>
);

export default Header;
