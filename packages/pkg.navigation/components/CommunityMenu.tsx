'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { Modal, ModalContent } from '@xipkg/modal';
import { CategoryCreate } from 'pkg.modal.category-create';
import { CommunitySettings } from 'pkg.community.settings';
import { AddCommunityModal } from 'pkg.modal.add-community';
import { CommunityChannelCreate } from 'pkg.community.channel-create';
import { InviteCommunityModal } from 'pkg.modal.invite-community';
import { ScrollArea } from '@xipkg/scrollarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@xipkg/tooltip';

import {
  CategoryAdd,
  ChannelAdd,
  ChevronSmallTop,
  Exit,
  PeopleInvite,
  Settings,
  Plus,
} from '@xipkg/icons';
import React, { useEffect, useState, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';

import { useParams, useRouter } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import { Avatar, AvatarFallback, AvatarImage } from '@xipkg/avatar';
import { toast } from 'sonner';

type CommunityTemplateT = {
  name: string;
  avatar: string;
  id: number;
  isOwner: boolean;
};

type AvatarPreviewPropsT = {
  communityId: number;
};

const AvatarPreview = ({ communityId }: AvatarPreviewPropsT) => (
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

type DropdownHeaderPropsT = {
  setIsOpen: any;
  inDropdown?: boolean;
  name: string | null;
  id: number | null;
};

const DropdownHeader = ({ setIsOpen, inDropdown = false, name, id }: DropdownHeaderPropsT) => {
  const params = useParams<{ 'community-id': string }>();

  const isNotCommunityId = typeof params['community-id'] !== 'string';

  return (
    <div
      id="community-profile"
      onClick={() => {
        if (id) setIsOpen((prev: boolean) => !prev);
      }}
      className={`flex h-12 px-2.5 py-2 md:w-[302px] ${!name || isNotCommunityId ? 'cursor-not-allowed' : 'cursor-pointer'} ${inDropdown ? '' : 'mt-0 sm:mt-8'
        } hover:bg-gray-5 items-center rounded-xl transition-colors ease-in`}
    >
      {!id || isNotCommunityId ? (
        <div className="bg-gray-10 size-[32px] animate-pulse rounded-[16px]" />
      ) : (
        <AvatarPreview communityId={id} />
      )}
      {!name || isNotCommunityId ? (
        <div className="bg-gray-10 ml-2 h-4 w-[156px] animate-pulse self-center rounded-[2px] text-[16px] font-semibold" />
      ) : (
        <div className="ml-2 self-center truncate text-[16px] font-semibold">{name}</div>
      )}
      <div className="ml-auto flex h-4 w-4 flex-col items-center justify-center">
        <ChevronSmallTop
          size="s"
          className={`transition-transform ease-in ${inDropdown ? '' : 'rotate-180'}`}
        />
      </div>
    </div>
  );
};

const CommunityLink = ({
  community,
  handleClose,
}: {
  community: CommunityTemplateT;
  handleClose: () => void;
}) => {
  const socket = useMainSt((state) => state.socket);
  const currentCommunityId = useMainSt((state) => state.communityMeta.id);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);
  const router = useRouter();
  const communityTitleRef = useRef<HTMLDivElement>(null);
  const [isTooltipActive, setIsTooltipActive] = React.useState(false);

  const handleClick = () => {
    socket?.emit(
      'close-community',
      {
        community_id: currentCommunityId,
      },
      (data: any) => {
        console.log('close-community', data);
        if (data === 204) {
          socket?.emit(
            'retrieve-community',
            {
              community_id: community.id,
            },
            (stats: number, { community, participant }: { community: any; participant: any }) => {
              console.log('stats', stats);
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
      },
    );
  };

  useEffect(() => {
    const element = communityTitleRef.current;
    if (element && element.clientWidth < element.scrollWidth) {
      setIsTooltipActive(true);
    }
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="overflow-hidden bg-transparent" asChild>
          <div
            onClick={handleClick}
            className="hover:bg-gray-5 flex h-12 w-full items-center rounded-xl px-2.5 py-2 transition-colors ease-in hover:cursor-pointer"
          >
            <AvatarPreview communityId={community.id} />
            <div
              className="ml-2 self-center truncate text-[16px] font-semibold text-gray-100"
              ref={communityTitleRef}
            >
              {community.name}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className={`max-w-[300px] ${isTooltipActive ? 'flex' : 'hidden'}`}>
          <p className="text-gray-100">{community.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const CommunityMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenCommunitySettings, setIsOpenCommunitySettings] = React.useState(false);
  const [isInviteCommunityModalOpen, setIsInviteCommunityModalOpen] = React.useState(false);
  const [isAddCommunityModalOpen, setIsAddCommunityModalOpen] = React.useState(false);
  const [isCategoryCreateOpen, setIsCategoryCreateOpen] = React.useState(false);
  const [isCommunityChannelCreateOpen, setIsCommunityChannelCreateOpen] = React.useState(false);

  const isOwner = useMainSt((state) => state.communityMeta.isOwner);

  // Берем community-id из URL
  const params = useParams();
  // Делим все сообщества пользователя на то, на странице которого мы сейчас
  // и на остальные
  const currentCommunity = useMainSt((state) => state.communityMeta);
  const [otherCommunities, setOtherCommunities] = useState<CommunityTemplateT[]>();

  const socket = useMainSt((state) => state.socket);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);
  const updateCategories = useMainSt((state) => state.updateCategories);
  const updateChannels = useMainSt((state) => state.updateChannels);

  useEffect(() => {
    socket?.emit('list-communities', (status: number, communities: any[]) => {
      const otherCommunities: CommunityTemplateT[] = communities.filter(
        (community) => community.id.toString() !== params['community-id'],
      );
      setOtherCommunities(otherCommunities);
    });
  }, [params]);

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
          (stats: number, { community, participant }: { community: any; participant: any }) => {
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
    <>
      <Modal
        open={isOpenCommunitySettings}
        onOpenChange={() => setIsOpenCommunitySettings((prev) => !prev)}
      >
        <ModalContent variant="full" className="p-4 lg:p-6">
          <CommunitySettings />
        </ModalContent>
      </Modal>
      <CategoryCreate
        open={isCategoryCreateOpen}
        onOpenChange={() => setIsCategoryCreateOpen((prev) => !prev)}
      />
      <CommunityChannelCreate
        open={isCommunityChannelCreateOpen}
        onOpenChange={() => setIsCommunityChannelCreateOpen((prev) => !prev)}
      />
      <InviteCommunityModal
        open={isInviteCommunityModalOpen}
        onOpenChange={() => setIsInviteCommunityModalOpen((prev) => !prev)}
      />
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
                      setIsInviteCommunityModalOpen((prev) => !prev);
                      handleClose();
                    }}
                  >
                    <span>Пригласить людей</span>
                    <PeopleInvite size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setIsOpenCommunitySettings(true);
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
                      setIsCommunityChannelCreateOpen((prev) => !prev);
                      handleClose();
                    }}
                  >
                    <span>Создать канал</span>
                    <ChannelAdd size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="group sm:w-[302px]"
                    onClick={() => {
                      setIsCategoryCreateOpen((prev) => !prev);
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
            <AddCommunityModal
              open={isAddCommunityModalOpen}
              onOpenChange={setIsAddCommunityModalOpen}
            >
              <DropdownMenuItem
                className="group text-gray-50 sm:w-[302px]"
                onClick={() => setIsAddCommunityModalOpen(true)}
              >
                <span>Присоединиться к сообществу</span>

                <Plus size="s" className="ml-auto h-4 w-4 fill-gray-50 group-hover:fill-gray-100" />
              </DropdownMenuItem>
            </AddCommunityModal>
          </DropdownMenuContent>
        </>
      </DropdownMenu>
    </>
  );
};
