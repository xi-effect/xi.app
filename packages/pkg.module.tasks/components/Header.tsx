import React from 'react';
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@xipkg/select';
import { Breadcrumbs } from '@xipkg/breadcrumbs';
import { selectStatuses } from '../consts';
import { SelectStatusT } from '../types';

const breadcrumbs = [
  { name: 'Моё пространство', link: '/home' },
  { name: 'Задания', link: '/tasks' },
];

type HeaderPropsT = {
  onSelect: (status: SelectStatusT) => void;
  selectValue: SelectStatusT;
};

const selectItems = [
  { value: selectStatuses.ALL, text: 'все' },
  { value: selectStatuses.APPOINTED, text: 'назначенные' },
  { value: selectStatuses.ASSESSED, text: 'оценённые' },
  { value: selectStatuses.CHECKING, text: 'проверяемые' },
  { value: selectStatuses.OVERDUE, text: 'просроченные' },
];

const Header = ({ onSelect, selectValue }: HeaderPropsT) => (
  <div className="flex flex-col gap-4 p-8">
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} size="s" />
    </div>
    <div className="flex items-center">
      <h1 className="text-3xl font-semibold max-[520px]:text-2xl sm:inline-block sm:text-4xl">
        Задания
      </h1>
      <div className="min-w-6 grow" />
      <Select value={selectValue} onValueChange={onSelect}>
        <SelectTrigger className="h-8 w-72 justify-start px-2 py-1" aria-label="Food">
          <span>Показывать: &nbsp; </span>
          <SelectValue />
          <div className="grow" />
        </SelectTrigger>
        <SelectContent className="w-72">
          {selectItems.map((item, index) => (
            <SelectItem value={item.value} key={index}>
              {item.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default Header;
