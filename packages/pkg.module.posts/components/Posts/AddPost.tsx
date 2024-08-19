'use client';

import { useState } from 'react';
import { Search, Share, MenuDots } from '@xipkg/icons';
import { Editor, type CustomElement } from 'pkg.module.editor';
import { Footer } from './Footer';

const mockData = [
  {
    id: '334223423',
    type: 'heading1',
    children: [
      {
        text: 'Ввведите название',
        id: '987865',
      },
    ],
  },
  {
    id: '5475688',
    type: 'heading3',
    children: [
      {
        text: 'Нажмите Tab для выбора инструмента',
        id: '90876',
      },
    ],
  },
] satisfies CustomElement[];

export const AddPost = () => {
  // Временно при нажатии на кнопку Сохранить выводится уведомление об ошибке
  const [isNotification, setIsNotification] = useState(false);
  const handleSubmit = () => setIsNotification(true);

  return (
    <div className="flex h-full flex-col">
      <header className="flex w-full flex-row justify-between pb-4">
        <div className="flex flex-row items-end gap-2">
          <span className="text-xl-base block font-semibold">4Д - БЖ</span>
          <span className="text-gray-60 hidden sm:block">Кастырин И.И.</span>
        </div>
        <nav className="flex flex-row">
          <div className="cursor-pointer">
            <Search size="l" className="p-2" />
          </div>
          <div className="cursor-pointer">
            <Share size="l" className="p-2" />
          </div>
          <div className="cursor-pointer">
            <MenuDots size="l" className="p-2" />
          </div>
        </nav>
      </header>
      <main className="flex-1 py-6 sm:py-8">
        <div className="flex flex-col gap-4">
          <Editor initialValue={mockData} />
        </div>
      </main>
      <Footer submitButtonText="Сохранить" submitButtonHandler={handleSubmit}>
        {isNotification && (
          <div className="bg-red-0 flex flex-row items-center gap-2 rounded-[8px] px-3 py-2 text-red-100">
            <div className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full border-2 border-red-100">
              <span>!</span>
            </div>
            <p className="text-xs-base">
              При сохранении файла возникла проблема. Повторное сохранение через 0:32
            </p>
          </div>
        )}
      </Footer>
    </div>
  );
};
