import React from 'react';
import { Main } from './components/Main/Main';
// import { Roles } from './components/Roles';
import { Participants } from './components/Participants';
import { Invites } from './components/Invites';
import { useInterfaceStore } from './interfaceStore';

const contentItems = [<Main />, <Participants />, <Invites />]; // <Roles />,

export const Content = () => {
  const page = useInterfaceStore((state) => state.page);

  return (
    <div className="relative flex h-full w-full flex-col gap-4 sm:ml-8">{contentItems[page]}</div>
  );
};
