import { MenuItem } from './MenuItem';
import { ItemT } from './types';
import { DeleteCommunity } from './DeleteCommunity';

const options: ItemT[] = [
  {
    name: 'Обзор',
  },
  // {
  //   name: 'Роли',
  // },
  {
    name: 'Участники',
  },
  {
    name: 'Приглашения',
  },
];

export const Menu = () => (
  <div className="flex w-full flex-col gap-1 sm:w-[220px]">
    {options.map((item, index) => (
      <MenuItem item={item} index={index} key={index} />
    ))}
    <DeleteCommunity />
  </div>
);
