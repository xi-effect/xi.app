import React from 'react';
import { useInterfaceStore } from '../../stores/interfaceStore';
import { Users } from './Users/Users';

export const Sidebar = () => {
  const currentSidebar = useInterfaceStore((state) => state.currentSidebar);

  return (
    <div>
      {currentSidebar === 'users' ? <Users /> : <div className="h-full w-full p-4">Sidebar</div>}
    </div>
  );
};
