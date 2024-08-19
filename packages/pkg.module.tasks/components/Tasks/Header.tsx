import React from 'react';
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@xipkg/select';
import {
  BreadcrumbsRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@xipkg/breadcrumbs';
import { useMainSt } from 'pkg.stores';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { selectStatuses } from '../../consts';
import { SelectStatusT } from '../../types';

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

export const Header = ({ onSelect, selectValue }: HeaderPropsT) => {
  const params = useParams<{ 'community-id': string; 'channel-id': string }>();

  const communityMeta = useMainSt((state) => state.communityMeta);
  const channels = useMainSt((state) => state.channels);

  const currentTasks = channels?.filter((item) => Number(params['channel-id']) === item.id);

  if (currentTasks === undefined) return null;

  console.log('channels', channels, currentTasks);

  return (
    <div className="flex flex-col gap-4 pb-4 md:pb-8">
      <div>
        <BreadcrumbsRoot size="s">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/communities/${params['community-id']}/home`}>
                  {communityMeta.name ?? 'Моё пространство'}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentTasks[0]?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbsRoot>
      </div>
      <div className="flex h-[40px] items-center">
        <h1 className="text-xl-base sm:text-h6 lg:text-h5 mr-auto font-semibold sm:inline-block">
          {currentTasks[0]?.name}
        </h1>
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
};
