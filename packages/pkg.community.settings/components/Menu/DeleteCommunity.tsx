import { useState } from 'react';
import { Button } from '@xipkg/button';
import { useMainSt } from 'pkg.stores';
import { useRouter } from 'next/navigation';
import { useGetUrlWithParams } from 'pkg.utils.client';
import { toast } from 'sonner';
import { useCommunityStore } from 'pkg.navigation/store/communityStore';
import { DeleteCommunityModal } from './DeleteCommunityModal';
import { RetrieveAnyCommunityT } from './types';

export const DeleteCommunity = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const socket = useMainSt((state) => state.socket);
  const communityId = useMainSt((state) => state.communityMeta.id);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);
  const getUrlWithParams = useGetUrlWithParams();
  const { setIsOpenCommunitySettings } = useCommunityStore();

  const router = useRouter();

  const handleDeleteCommunity = () => {
    socket.emit(
      'delete-community',
      {
        community_id: communityId,
      },
      (status: number) => {
        if (status === 204) {
          setIsDeleteModalOpen(false);
          socket.emit(
            'retrieve-any-community',
            (status: number, { community, participant }: RetrieveAnyCommunityT) => {
              if (status === 200) {
                toast('Сообщество успешно удалено');

                updateCommunityMeta({
                  id: community.id,
                  isOwner: participant.is_owner,
                  name: community.name,
                  description: community.description,
                });

                if (community && community.id) {
                  router.replace(getUrlWithParams(`/communities/${community.id}/home`));
                  setIsOpenCommunitySettings(false);
                  router.refresh();
                }
              } else if (status === 404) {
                toast('У вас больше нет сообществ');

                updateCommunityMeta({
                  id: null,
                  isOwner: false,
                  name: '',
                  description: '',
                });

                router.replace(getUrlWithParams('/empty'));
              }
            },
          );
        } else {
          setIsDeleteModalOpen(false);
          toast('Не удалось удалить сообщество');
        }
      },
    );
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setIsDeleteModalOpen((isOpen) => !isOpen)}
        className="text-gray-60 mt-6 h-auto px-2 py-2.5 transition-colors hover:text-red-100"
      >
        <span className="text-s-base font-normal">Удалить сообщество</span>
      </Button>
      <DeleteCommunityModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDeleteCommunity}
      />
    </>
  );
};
