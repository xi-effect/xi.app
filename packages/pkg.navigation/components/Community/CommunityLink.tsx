/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useMainSt } from 'pkg.stores';
import { useRouter } from 'next/navigation';
import { useGetUrlWithParams } from 'pkg.utils.client';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@xipkg/tooltip';
import { RetrieveCommunityT } from '../types';
import { AvatarPreview } from '../AvatarPreview';
import { CommunityTemplateT } from '../../types';

export const CommunityLink = ({
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
  const getUrlWithParams = useGetUrlWithParams();

  const communityTitleRef = useRef<HTMLDivElement>(null);
  const [isTooltipActive, setIsTooltipActive] = useState(false);

  const handleClick = () => {
    socket?.emit(
      'close-community',
      {
        community_id: currentCommunityId,
      },
      (data: number) => {
        if (data === 204) {
          socket?.emit(
            'retrieve-community',
            {
              community_id: community.id,
            },
            (status: number, { community, participant }: RetrieveCommunityT) => {
              if (status === 200) {
                updateCommunityMeta({
                  id: community.id,
                  isOwner: participant.is_owner,
                  name: community.name,
                  description: community.description,
                });

                router.push(getUrlWithParams(`/communities/${community.id}/home`));
                if (handleClose) handleClose();
              }
              if (status === 404) {
                toast('Сообщества не существует');
                socket.emit(
                  'retrieve-any-community',
                  (status: number, { community, participant }: RetrieveCommunityT) => {
                    if (status === 200) {
                      updateCommunityMeta({
                        id: community.id,
                        isOwner: participant.is_owner,
                        name: community.name,
                        description: community.description,
                      });

                      if (community) {
                        router.replace(getUrlWithParams(`/communities/${community.id}/home`));
                        router.refresh();
                      }
                    }
                  },
                );
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
