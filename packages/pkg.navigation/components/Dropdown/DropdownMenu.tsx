import React, { useEffect, useState, useMemo } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import { CategoryAdd, ChannelAdd, Exit, PeopleInvite, Plus, Settings } from '@xipkg/icons';
import { ScrollArea } from '@xipkg/scrollarea';
import { useMainSt } from 'pkg.stores';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DropdownHeader } from './DropdownHeader';
import { CommunityLink } from '../Community';
import { useCommunityStore } from '../../store/communityStore';
import {
  CATEGORY_CREATE,
  CHANNEL_CREATE,
  INVITE_COMMUNITY,
  ADD_COMMUNITY,
  OPEN_COMMUNITY_SETTINGS,
} from '../../store/modalConst';
import { RetrieveCommunityT } from '../types';

export const DropdownMenuBasic = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { setModal } = useCommunityStore();

  // из-за warn в консоли я решил вернуть обратно и оставить получения свйоств из стора в таком виде
  const currentCommunity = useMainSt((state) => state.communityMeta);
  const communities = useMainSt((state) => state.communities);
  const socket = useMainSt((state) => state.socket);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);
  const updateCategories = useMainSt((state) => state.updateCategories);
  const updateChannels = useMainSt((state) => state.updateChannels);
  const updateCommunities = useMainSt((state) => state.updateCommunities);

  const { isOwner } = currentCommunity;

  // Берем community-id из URL
  const params = useParams();

  useEffect(() => {
    socket?.emit('list-communities', (status: number, communities: any[]) => {
      updateCommunities(communities);
    });
  }, [params]);

  const otherCommunities = useMemo(
    () =>
      communities?.filter((community) => community.id?.toString() !== params['community-id']) ?? [],
    [communities, params['community-id']],
  );

  const router = useRouter();

  const handleClose = () => setIsOpen(false);

  const handleLeaveCommunity = () => {
    socket?.emit('leave-community', { community_id: currentCommunity.id }, (status: number) => {
      if (status === 204 && otherCommunities) {
        updateCategories([]);
        updateChannels([]);

        socket?.emit(
          'retrieve-community',
          {
            community_id: otherCommunities[0].id,
          },
          (stats: number, { community, participant }: RetrieveCommunityT) => {
            if (stats === 200) {
              updateCommunityMeta({
                id: community.id,
                isOwner: participant.is_owner,
                name: community.name,
                description: community.description,
              });

              router.push(`/communities/${community.id}/home`);
              if (handleClose) handleClose();
            }
          },
        );
      }

      if (status === 409) {
        toast('Владелец не может выйти из своего сообщества');
      }
    });
  };

  return (
    <DropdownMenu open={isOpen}>
      <>
        <DropdownMenuTrigger asChild>
          <div>
            <DropdownHeader
              setIsOpen={setIsOpen}
              name={currentCommunity.name}
              id={currentCommunity.id}
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          onInteractOutside={handleClose}
          className="relative right-[1px] top-[-58px] w-[calc(100vw-22px)] sm:w-[312px]"
        >
          <div className="bg-gray-5 rounded-lg">
            <DropdownHeader
              setIsOpen={setIsOpen}
              inDropdown
              name={currentCommunity.name}
              id={currentCommunity.id}
            />
            {isOwner && (
              <>
                <DropdownMenuItem
                  className="group sm:w-[302px]"
                  onClick={() => {
                    setModal(INVITE_COMMUNITY);
                    handleClose();
                  }}
                >
                  <span>Пригласить людей</span>
                  <PeopleInvite size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setModal(OPEN_COMMUNITY_SETTINGS);
                    handleClose();
                  }}
                  className="group sm:w-[302px]"
                >
                  <span>Настройки сообщества</span>
                  <Settings size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="group sm:w-[302px]"
                  onClick={() => {
                    setModal(CHANNEL_CREATE);
                    handleClose();
                  }}
                >
                  <span>Создать канал</span>
                  <ChannelAdd size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="group sm:w-[302px]"
                  onClick={() => {
                    setModal(CATEGORY_CREATE);
                    handleClose();
                  }}
                >
                  <span>Создать категорию</span>
                  <CategoryAdd size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem onClick={handleLeaveCommunity} className="group sm:w-[302px]" error>
              <span>Покинуть сообщество</span>
              <Exit size="s" className="fill-red-40 group-hover:fill-red-80 ml-auto h-4 w-4" />
            </DropdownMenuItem>
          </div>

          {otherCommunities && otherCommunities.length <= 7 && (
            <div className="mt-2">
              {otherCommunities.map((community, index) => (
                <CommunityLink key={index} community={community} handleClose={handleClose} />
              ))}
            </div>
          )}
          {otherCommunities && otherCommunities.length > 7 && (
            <ScrollArea className="h-[300px] [&>div>div[style]]:!block">
              <div className="mt-2">
                {otherCommunities.map((community, index) => (
                  <CommunityLink key={index} community={community} handleClose={handleClose} />
                ))}
              </div>
            </ScrollArea>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="group text-gray-50 sm:w-[302px]"
            onClick={() => {
              setModal(ADD_COMMUNITY);
              handleClose();
            }}
          >
            <span>Присоединиться к сообществу</span>
            <Plus size="s" className="ml-auto h-4 w-4 fill-gray-50 group-hover:fill-gray-100" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </>
    </DropdownMenu>
  );
};
