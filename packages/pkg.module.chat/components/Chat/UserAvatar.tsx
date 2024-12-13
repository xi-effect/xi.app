import React, { memo } from 'react';
import { useUserProfile } from 'pkg.api';
import { Avatar, AvatarFallback, AvatarImage } from '@xipkg/avatar';

type UserAvatarPropsT = {
  userId: number;
};

const UserAvatar = memo(({ userId }: UserAvatarPropsT) => {
  const { data } = useUserProfile(userId);

  if (!data) return null;

  return (
    <Avatar size="l" className="mr-2">
      <AvatarImage
        src={`https://auth.xieffect.ru/api/users/${userId}/avatar.webp`}
        imageProps={{
          src: `https://auth.xieffect.ru/api/users/${userId}/avatar.webp`,
          alt: 'User Avatar',
        }}
        alt="User Avatar"
      />
      <AvatarFallback size="l">{data.display_name[0]}</AvatarFallback>
    </Avatar>
  );
});

UserAvatar.displayName = 'UserAvatar';

export { UserAvatar };
