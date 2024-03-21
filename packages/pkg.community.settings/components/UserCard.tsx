import React, { ReactNode } from 'react';
import Image from 'next/image';

interface UserCardProps {
  avatarSrc: string;
  name: string;
  login: string;
  before?: ReactNode;
  after?: ReactNode;
}

const UserCard = ({
  avatarSrc = '/assets/avatarrep.svg',
  after = null,
  before = null,
  login,
  name,
}: UserCardProps) => (
  <div className="flex items-center py-3">
    {before}
    <Image className="rounded-full" src={avatarSrc} alt="" width={24} height={24} />
    <p className="ml-2 font-medium text-gray-100">{name}</p>
    <span className="text-gray-60 ml-1">{login}</span>
    {after}
  </div>
);

export default UserCard;
