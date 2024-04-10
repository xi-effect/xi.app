import React, { useCallback } from 'react';
import { Input } from '@xipkg/input';
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
        <div className="hidden w-[250px] p-4 md:block">
          <Input
            className="placeholder:text-base"
            variant="s"
            placeholder="Поиск"
            before={<Search size="s" className="fill-gray-60" />}
            onChange={(event) => {
              handleSearch(event);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
