import React from 'react';
import { UsersModals } from './UsersModals';
import { User } from './User';

export const Users = () => (
  <div className="mx-auto w-full max-w-xl p-4">
    <User />
    <UsersModals />
  </div>
);
