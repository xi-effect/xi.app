import React, { useState } from 'react';
import { useMainSt } from 'pkg.stores';
import { Button } from '@xipkg/button';
import { Edit, Trash } from '@xipkg/icons';
import { Editor, mockValues } from 'pkg.module.editor';
import { DeletePostModal } from 'pkg.modal.delete-post';
import { Header } from './Header';

export const Post = () => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const isOwner = useMainSt((state) => state.communityMeta.isOwner);

  return (
    <section className="p-4 sm:p-8">
      <Header />
      {isOwner &&
        <div className="flex flex-row gap-3">
          <Button
            variant="ghost"
            className="flex gap-1 px-0 hover:bg-transparent focus:!hover-bg-brand-40 active:!hover-bg-brand-40"
            onClick={() => setIsReadOnly(!isReadOnly)}
          >
            <Edit />
            <span className="hover:border-b hover:border-b-gray-40">Редактировать</span>
          </Button>
          <DeletePostModal>
            <Button variant="ghost" className="flex gap-1 px-0 hover:bg-transparent !focus:hover-bg-transparent !active:hover-bg-transparent">
              <Trash className="fill-red-80" />
              <span className="text-red-80 hover:border-b hover:border-b-red-80">Удалить</span>
            </Button>
          </DeletePostModal>
        </div>
      }
      <Editor initialValue={mockValues} readOnly={isReadOnly} />
    </section>
  );
};
