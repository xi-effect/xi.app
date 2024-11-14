import { File, Group, Pin } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { useParams } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import React from 'react';
import { useInterfaceStore } from '../interfaceStore';

export const Header = () => {
  const currentSidebar = useInterfaceStore((state) => state.currentSidebar);
  const setCurrentSidebar = useInterfaceStore((state) => state.setCurrentSidebar);

  const params = useParams<{ 'community-id': string; 'channel-id': string }>();
  const channels = useMainSt((state) => state.channels);
  const categories = useMainSt((state) => state.categories);
  const currentChat = channels?.filter((item) => Number(params['channel-id']) === item.id);

  if (!currentChat || currentChat.length === 0) return null;

  console.log('currentChat', currentChat);

  const currentChatCategory =
    typeof currentChat[0].categoryId === 'number'
      ? categories?.filter((item) => currentChat[0].categoryId === item.id)
      : null;

  const handleToggle = (value: 'users' | 'pinned' | 'media') => {
    if (currentSidebar === value) return setCurrentSidebar(null);
    return setCurrentSidebar(value);
  };

  return (
    <div className="bg-gray-0 text-xl-base w-full p-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <h1 className="text-xl-base">{currentChat[0].name}</h1>
          {currentChatCategory && (
            <p className="text-gray-60 text-m-base pt-2">{currentChatCategory[0].name}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="s"
            type="button"
            className="h-auto p-2"
            onClick={() => handleToggle('pinned')}
          >
            <Pin size="s" />
          </Button>
          <Button
            variant="ghost"
            size="s"
            type="button"
            className="h-auto p-2"
            onClick={() => handleToggle('media')}
          >
            <File size="s" />
          </Button>
          <Button
            variant="ghost"
            size="s"
            type="button"
            className="h-auto p-2"
            onClick={() => handleToggle('users')}
          >
            <Group size="s" />
          </Button>
        </div>
      </div>
    </div>
  );
};
