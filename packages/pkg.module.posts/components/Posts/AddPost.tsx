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
  // Временно при нажатии на кнопку Сохранить вывожу уведомление об ошибке,
  // чтобы наглядно видеть, как выглядит уведомление
  const [isNotification, setIsNatification] = useState(false);
  const handleSubmit = () => setIsNatification(true);

  return (
    <div className="flex flex-col h-full">
      <header className="w-full flex flex-row justify-between pb-4">
        <div className="flex flex-row gap-2 items-end">
          <span className="block text-xl-base font-semibold">4Д - БЖ</span>
          <span className="hidden sm:block text-gray-60">Кастырин И.И.</span>
        </div>
        {/* Временно недостающие иконки заменены другими. Нужно будет добавить в кит иконки */}
        {/* Разобраться, что делает каждый из пунктов меню при нажатии на него */}
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
          {/* <h1 className="text-h3 text-gray-30">Ввведите название</h1>
          <p className="text-l-base text-gray-30">Нажмите Tab для выбора инструмента</p> */}
          <Editor initialValue={mockData} />
        </div>
      </main>
      <Footer
        submitButtonText="Сохранить"
        submitButtonHandler={handleSubmit}
      >
        {isNotification &&
          <div className="rounded-[8px] px-3 py-2 bg-red-0 text-red-100 flex flex-row gap-2 items-center">
            <div className="flex min-w-[20px] h-[20px] border-2 border-red-100 rounded-full items-center justify-center">
              <span>!</span>
            </div>
            <p className="text-xs-base">При сохранении файла возникла проблема. Повторное сохранение через 0:32</p>
          </div>
        }
      </Footer>
    </div>
  );
};
