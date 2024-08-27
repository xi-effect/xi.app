import { useState } from 'react';
import { Button } from '@xipkg/button';
import { useMainSt } from 'pkg.stores';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DeleteCommunityModal } from './DeleteCommunityModal';

export const DeleteCommunity = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const socket = useMainSt((state) => state.socket);
  const communityId = useMainSt((state) => state.communityMeta.id);
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
          toast('Сообщество успешно удалено');
          router.push('/');
          router.refresh();
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
