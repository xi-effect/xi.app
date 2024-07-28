import React, { useState } from 'react';
import { Button } from '@xipkg/button';
import { Clip, Edit, WhiteBoard } from '@xipkg/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@xipkg/dropdown';
import { File } from '@xipkg/file';
import { Header } from './Header';
import { FilesUploadModal } from './FilesUploadModal';
import { EditorModal } from './EditorModal';
import { Comments } from './Comments';

export const Task = () => {
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDeleteFile = (fileName: string) => {
    setFiles((p) => p.filter((f) => f.name !== fileName));
  };

  return (
    <>
      <Header />
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-col gap-6">
          <div className="border-gray-30 rounded-lg border p-4">
            <p>
              Составьте CV и Cover Letter для любой вакансии, которая вас интересует. Прикрепите
              файлы к заданию. Примеры оформления прикреплены снизу
            </p>
          </div>
          <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 2xl:flex">
            <File
              name="CV example.pdf"
              size={14}
              url=""
              className="w-full max-w-[100%] 2xl:max-w-[330px]"
            />
            <File
              name="CV example.pdf"
              size={14}
              url=""
              className="w-full max-w-[100%] 2xl:max-w-[330px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="border-gray-30 flex w-full flex-col gap-6 rounded-lg border p-6 xl:w-[400px] 2xl:w-[450px]">
            <div className="flex justify-between">
              <p>Решение до 14 мая 2024</p>
              <span className="bg-orange-0 rounded px-2 py-1 text-xs">Назначено</span>
            </div>
            <div className="flex flex-col gap-4">
              {files.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {files.map((file) => (
                    <li key={file.name}>
                      <File
                        name={file.name}
                        size={file.size}
                        url=""
                        className="max-w-[100%]"
                        onDelete={() => handleDeleteFile(file.name)}
                      />
                    </li>
                  ))}
                </ul>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="flex gap-2">
                    <Clip />
                    Прикрепить или создать
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                  {/* временное решение проблемы  pointer-events:none
                  на body при закрытии модалки */}
                  <DropdownMenuItem onClick={() => setTimeout(() => setIsFilesModalOpen(true), 0)}>
                    <Clip />
                    <span className="px-2">Прикрепить файл</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeout(() => setIsEditorModalOpen(true), 0)}>
                    <Edit />
                    <span className="px-2">Создать в редакторе</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <WhiteBoard />
                    <span className="px-2">Создать тетрадь</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button disabled={files.length < 1}>Отправить на проверку</Button>
            </div>
          </div>
          <Comments />
        </div>
      </div>
      <FilesUploadModal
        isOpen={isFilesModalOpen}
        onOpenChange={setIsFilesModalOpen}
        onConfirm={setFiles}
      />
      <EditorModal
        isOpen={isEditorModalOpen}
        onConfirm={() => console.log(2)}
        onOpenChange={setIsEditorModalOpen}
      />
    </>
  );
};
