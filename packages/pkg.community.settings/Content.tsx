import React from 'react';
import { Main } from './components/Main/Main';
import { Roles } from './components/Roles';
import { Participants } from './components/Participants';
import { useInterfaceStore } from './interfaceStore';

const contentItems = [<Main />, <Roles />, <Participants />];

export const Content = () => {
  const page = useInterfaceStore((state) => state.page);

  return <div className="relative h-full w-full sm:ml-8 flex flex-col gap-4">{contentItems[page]}</div>;
};
