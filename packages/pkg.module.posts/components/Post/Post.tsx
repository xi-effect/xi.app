import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import { Editor } from 'pkg.module.editor';
import { Header } from './Header';
import { announcements } from '../Posts/mockData';
import { Footer } from '../Posts/Footer';

export const Post = () => {
  const isOwner = useMainSt((state) => state.communityMeta.isOwner);
  const params = useParams<{ 'community-id': string, 'channel-id': string, 'post-id': string }>();
  const currentPost = announcements?.filter((item) => item.id === Number(params['post-id']))[0];
  const [isReadOnly, setIsReadOnly] = useState(true);
  // Временно при нажатии на кнопку Опубликовать выводится уведомление об ошибке
  const [isNotification, setIsNotification] = useState(false);
  const handleSubmit = () => setIsNotification(true);

  return (
    <section className="flex flex-col h-full">
      <Header editHandler={setIsReadOnly} />
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
