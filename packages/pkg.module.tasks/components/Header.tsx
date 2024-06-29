import React from 'react';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@xipkg/select';
import Breadcrumbs from './Breadcrumbs';
import { StatusEnum } from './TaskCard';

export enum SelectEnum {
  ALL = 'all',
  APPOINTED = StatusEnum.APPOINTED,
  OVERDUE = StatusEnum.OVERDUE,
  CHECKING = StatusEnum.CHECKING,
  ASSESSED = StatusEnum.ASSESSED,
}

interface HeaderProps {
  onSelect: (status: SelectEnum) => void;
  selectValue: SelectEnum;
}

const Header: React.FC<HeaderProps> = ({ onSelect, selectValue }) => {
  // Временная логика отображения хлебных крошек
  const shouldShowBreadcrumbs = true;

  const breadcrumbs = [
    { title: 'Моё пространство', href: '/home' },
    { title: 'Задания', href: '/tasks' },
  ];

  return (
    <div className="flex-col px-8 py-4 max-[520px]:py-8 sm:py-8">
      <Breadcrumbs isVisible={shouldShowBreadcrumbs} breadcrumbs={breadcrumbs} />
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold max-[520px]:text-2xl sm:inline-block sm:text-4xl">
          Задания
        </h1>
        <div className="min-w-6 grow" />
        <Select value={selectValue} onValueChange={onSelect}>
          <SelectTrigger className="h-8 w-72 justify-start px-2 py-1" aria-label="Food">
            <div>Показывать: &nbsp; </div>
            <SelectValue />
            <div className="grow" />
          </SelectTrigger>
          <SelectContent className="w-72">
            <SelectItem value={SelectEnum.ALL}>все</SelectItem>
            <SelectItem value={SelectEnum.APPOINTED}>назначенные</SelectItem>
            <SelectItem value={SelectEnum.ASSESSED}>оценённые</SelectItem>
            <SelectItem value={SelectEnum.CHECKING}>проверяемые</SelectItem>
            <SelectItem value={SelectEnum.OVERDUE}>просроченные</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Header;
