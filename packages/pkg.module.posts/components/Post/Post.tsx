import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import { Button } from '@xipkg/button';
import { Edit, Trash } from '@xipkg/icons';
import { Editor } from 'pkg.module.editor';
import { DeletePostModal } from 'pkg.modal.delete-post';
import { Header } from './Header';
import { announcements } from '../Posts/mockData';
import { Footer } from '../Posts/Footer';

export const Post = () => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  // Пока показываю/скрываю элементы интерфейса,
  // позволяющие редактировать содержимое,
  // по isOwner, но впослествии там будут другие права (не isOwner, а что-то другое)
  const isOwner = useMainSt((state) => state.communityMeta.isOwner);
  const params = useParams<{ 'community-id': string, 'channel-id': string, 'post-id': string }>();
  const currentPost = announcements?.filter((item) => item.id === Number(params['post-id']))[0];

  // Временно при нажатии на кнопку Опубликовать вывожу уведомление об ошибке,
  // чтобы наглядно видеть, как выглядит уведомление
  const [isNotification, setIsNatification] = useState(false);
  const handleSubmit = () => setIsNatification(true);

  return (
    <section className="flex flex-col h-full">
      <Header />
      {isOwner &&
        <div className="flex flex-row gap-3">
          <Button
            variant="ghost"
            className="flex gap-1 px-0 hover:bg-transparent focus:bg-transparent active:bg-transparent"
            onClick={() => setIsReadOnly(!isReadOnly)}
          >
            <Edit />
            <span className="border-b border-b-gray-40">Редактировать</span>
          </Button>
          <DeletePostModal>
            <Button variant="ghost" className="flex gap-1 px-0 hover:bg-transparent focus:bg-transparent active:bg-transparent">
              <Trash className="fill-red-80" />
              <span className="text-red-80 border-b border-b-red-80">Удалить</span>
            </Button>
          </DeletePostModal>
        </div>
      }
      <div className="flex-1">
        <Editor initialValue={currentPost.content} readOnly={isReadOnly} />
      </div>
      {isOwner &&
        <Footer
          submitButtonText="Опубликовать"
          submitButtonHandler={handleSubmit}
        >
          {
            currentPost.isDraft && !isNotification &&
            <div className="rounded-[8px] px-3 py-2 text-gray-60 flex flex-row gap-2 items-center">
              <p className="text-xs-base">Черновик сохранен в 16:22</p>
            </div>
          }
          {isNotification &&
            <div className="rounded-[8px] px-3 py-2 bg-red-0 text-red-100 flex flex-row gap-2 items-center">
              <div className="flex min-w-[20px] h-[20px] border-2 border-red-100 rounded-full items-center justify-center">
                <span>!</span>
              </div>
              <p className="text-xs-base">При сохранении файла возникла проблема. Повторное сохранение через 0:32</p>
            </div>
          }
        </Footer>
      }
    </section>
  );
};
