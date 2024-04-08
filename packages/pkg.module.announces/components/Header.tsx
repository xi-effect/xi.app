import React, { useCallback } from 'react';
import { Input } from '@xipkg/input';
import { Button } from '@xipkg/button';
import { Search } from '@xipkg/icons';
import debounce from 'lodash/debounce';
import Breadcrumbs from './Breadcrumbs';

interface HeaderProps {
  onSearch: (searchValue: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().toLowerCase();
    debouncedSearch(value);
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 700),
    [],
  );

  // Временная логика отображения хлебных крошек
  const shouldShowBreadcrumbs = true;

  const breadcrumbs = [
    { title: 'МИПК И. Фёдорова', href: '/home' },
    { title: 'Объявления', href: '/announcements' },
    { title: 'Объявления', href: '/announcements' },
    { title: 'Объявления', href: '/announcements' },
  ];

  return (
    <div className="flex-col py-4 max-[520px]:py-7 sm:py-8">
      <Breadcrumbs isVisible={shouldShowBreadcrumbs} breadcrumbs={breadcrumbs} />
      <div className="flex items-end justify-between ">
        <h1 className="text-3xl font-semibold max-[520px]:text-2xl sm:inline-block sm:text-4xl">
          Объявления
        </h1>
        <div className="relative hidden md:block">
          <Input
            className="border-gray-30 size-full h-8 border-2 pb-4 pl-6 pr-16 text-sm placeholder:text-base"
            placeholder="Поиск"
            onChange={(event) => {
              handleSearch(event);
            }}
          />
          <Button
            type="submit"
            className="absolute -top-0.5 left-1.5 !size-min translate-y-[50%] bg-transparent p-0"
          >
            <Search className="fill-gray-60 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
