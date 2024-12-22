import React, { memo } from 'react';
import { useUserProfile } from 'pkg.api';

type UserNamePropsT = {
  userId: number;
};

const UserName = memo(({ userId }: UserNamePropsT) => {
  const { data, status } = useUserProfile(userId);

  if (status === 'loading') {
    return <div className="bg-gray-10 mr-2 h-6 w-36 rounded-lg" />;
  }

  if (!data) return null;

  return <span className="mr-2 font-semibold">{data.display_name}</span>;
});

UserName.displayName = 'UserName';

export { UserName };
