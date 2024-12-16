import React from 'react';
import { UserProfile } from '@xipkg/userprofile';

type UserProfileCardT = {
  id: number | null;
  name: string;
  mail: string;
};

export const UserProfileCard = ({ id, name, mail }: UserProfileCardT) => {
  console.log('123');
  return (
    <div className="flex gap-2">
      <div className="ml-auto flex h-[32px] w-[32px] content-center items-center">
        <UserProfile
          loading={id === null || id === undefined}
          userId={id || null}
          size="m"
          withOutText
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center">
          <span className="text-s-base font-semibold">{name}</span>
        </div>
        <p className="text-xxs-base text-gray-60 relative">{mail}</p>
      </div>
    </div>
  );
};
