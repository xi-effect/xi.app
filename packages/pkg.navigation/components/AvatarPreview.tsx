import { Avatar, AvatarFallback, AvatarImage } from '@xipkg/avatar';

type AvatarPreviewPropsT = {
  communityId: number | null | 'empty';
};

export const AvatarPreview = ({ communityId }: AvatarPreviewPropsT) => (
  <Avatar size="m">
    <AvatarImage
      src={`https://api.xieffect.ru/files/communities/${communityId}/avatar.webp`}
      imageProps={{
        src: `https://api.xieffect.ru/files/communities/${communityId}/avatar.webp`,
        alt: 'community user',
      }}
      alt="community avatar"
    />
    <AvatarFallback size="m" />
  </Avatar>
);
