import { useMemo, useState } from 'react';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';
import { useMedia } from 'pkg.utils.client';
import { ItemContextMenu } from './ItemContextMenu';
import { ChannelT, CategoryT } from './types';
import { Channel } from './Channel';
import { EditChannelModal } from './EditChannelModal';
import { EditCategoryModal } from './EditCategoryModal';

type CategoryContainerT = {
  category: CategoryT;
  channels: ChannelT[];
  setSlideIndex?: (arg: number) => void;
};

export const CategoryContainer = ({ category, channels, setSlideIndex }: CategoryContainerT) => {
  const isOwner = useMainSt((state) => state.communityMeta.isOwner);
  const communityId = useMainSt((state) => state.communityMeta.id);
  const socket = useMainSt((state) => state.socket);
  const deleteCategory = useMainSt((state) => state.deleteCategory);
  const updateChannels = useMainSt((state) => state.updateChannels);
  const updateCategories = useMainSt((state) => state.updateCategories);
  const currentChannels = useMainSt((state) => state.channels);
  const currentCategories = useMainSt((state) => state.categories);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<ChannelT | null>(null);
  const [currentCategory, setCurrentCategory] = useState<CategoryT | null>(null);
  const [isEditCategoryModal, setIsEditCategoryModal] = useState(false);

  const { name, description, uid } = category;
  const channelsIds = useMemo(() => channels.map((channel: ChannelT) => channel.uid), [channels]);

  const isMobile = useMedia('(max-width: 960px)');

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: uid,
    data: {
      type: 'Category',
      category,
    },
    disabled: !isOwner || isMobile,
  });

  const categoryStyle = {
    minHeight: '96px',
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div style={categoryStyle} ref={setNodeRef}>
        <div className="border-b-brand-80 bg-brand-80 h-[4px] rounded-[2px]" />
      </div>
    );
  }

  const handleOpenEditModal = (channel: ChannelT) => {
    setCurrentChannel(channel);
    // временное решение проблемы с pointer-events на body
    setTimeout(() => setIsEditModalOpen(true), 0);
  };
  const handleOpenEditCategory = (category: CategoryT) => {
    setCurrentCategory(category);
    // временное решение проблемы с pointer-events на body
    setTimeout(() => setIsEditCategoryModal(true), 0);
  };

  const handleDelete = () => {
    socket?.emit(
      'delete-category',
      {
        community_id: communityId,
        category_id: category.id,
      },
      (status: number) => {
        if (status === 204) {
          toast('Категория успешно удалена');
          deleteCategory(category.id);
        } else {
          toast(`Что-то пошло не так. Ошибка ${status}`);
        }
      },
    );
  };

  const updateCategoryData = (updatedCategory: CategoryT) => {
    if (!currentCategories) return null;

    return currentCategories.map((category: CategoryT) =>
      category.id === updatedCategory.id
        ? { ...category, name: updatedCategory.name, description: updatedCategory.description }
        : category,
    );
  };

  const handleEditCategory = (categoryData: CategoryT) => {
    socket?.emit(
      'update-category',
      {
        community_id: communityId,
        category_id: categoryData.id,
        data: {
          name: categoryData.name,
          description: categoryData.description,
        },
      },
      (status: number) => {
        if (status === 200) {
          toast('Категория успешно обновлена');
          updateCategories(updateCategoryData(categoryData));
        } else {
          toast(`Что-то пошло не так. Ошибка ${status}`);
        }
      },
    );
  };

  const updateChannelName = (updatedChannel: ChannelT) => {
    if (!currentChannels) return null;

    return currentChannels.map((channel) =>
      channel.id === updatedChannel.id ? { ...channel, name: updatedChannel.name } : channel,
    );
  };

  const handleEditChannel = (channelData: ChannelT) => {
    socket?.emit(
      'update-channel',
      {
        community_id: communityId,
        channel_id: channelData.id,
        data: {
          name: channelData.name,
          description: '',
        },
      },
      (status: number) => {
        if (status === 200) {
          toast('Канал успешно обновлен');
          updateChannels(updateChannelName(channelData));
        } else {
          toast(`Что-то пошло не так. Ошибка ${status}`);
        }
      },
    );
  };

  return (
    <div ref={setNodeRef} style={categoryStyle}>
      <ItemContextMenu
        isTriggerActive={isOwner}
        handleEdit={() => handleOpenEditCategory(category)}
        handleDelete={handleDelete}
      >
        <div {...attributes} {...listeners}>
          {name && (
            <div className="flex flex-col items-start p-2">
              <span className="text-[16px] font-semibold">{name}</span>
              {description && <span className="text-[14px] font-normal">{description}</span>}
            </div>
          )}
        </div>
        <div className="flex min-h-[28px] flex-grow flex-col gap-2 overflow-x-hidden overflow-y-hidden">
          <SortableContext strategy={verticalListSortingStrategy} items={channelsIds}>
            {channels.map((channel: ChannelT) => (
              <Channel
                setSlideIndex={setSlideIndex}
                key={channel.uid}
                channel={channel}
                onOpenEditModal={() => handleOpenEditModal(channel)}
              />
            ))}
          </SortableContext>
        </div>
      </ItemContextMenu>
      {currentChannel && (
        <EditChannelModal
          isOpen={isEditModalOpen}
          onConfirm={handleEditChannel}
          onOpenChange={(value) => {
            setIsEditModalOpen(value);
            setCurrentChannel(null);
          }}
          channel={currentChannel}
        />
      )}
      {currentCategory && (
        <EditCategoryModal
          onOpenChange={(value) => {
            setIsEditCategoryModal(value);
            setCurrentCategory(null);
          }}
          isOpen={isEditCategoryModal}
          onConfirm={handleEditCategory}
          category={currentCategory}
        />
      )}
    </div>
  );
};
