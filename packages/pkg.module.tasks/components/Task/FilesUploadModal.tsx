import * as M from '@xipkg/modal';
import { Button } from '@xipkg/button';
import React, { useState } from 'react';
import { Close } from '@xipkg/icons';
import { FileUploader } from '@xipkg/fileuploader';
import { File } from '@xipkg/file';

export type FilesUploadModalPropsT = {
  isOpen: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
  onConfirm: (f: File[]) => void;
};

export const FilesUploadModal = ({ isOpen, onConfirm, onOpenChange }: FilesUploadModalPropsT) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesChange = async (fileList: File[]) => {
    setFiles((f) => [...f, ...fileList]);
  };

  const handleDeleteFile = (fileName: string) => {
    setFiles((p) => p.filter((f) => f.name !== fileName));
  };

  const handleUploadFiles = () => {
    onConfirm(files);
    onOpenChange(false);
    setFiles([]);
  };

  return (
    <M.Modal open={isOpen} onOpenChange={onOpenChange}>
      <M.ModalContent className="flex h-full max-h-[calc(100vh-128px)] flex-col rounded-2xl text-center">
        <M.ModalCloseButton>
          <Close className="fill-gray-80 sm:fill-gray-0" />
        </M.ModalCloseButton>
        <M.ModalHeader>
          <M.ModalTitle>Загрузка файлов</M.ModalTitle>
        </M.ModalHeader>
        <div className="flex h-full flex-col gap-6 p-6">
          <FileUploader
            onChange={handleFilesChange}
            multiple
            size="large"
            accept=".jpg, .gif, .png, .pdf, .zip"
            fileTypesHint={['JPG', 'GIF', 'PNG', 'PDF', 'ZIP']}
          />
          {files.length > 0 && (
            <ul className="flex flex-col gap-4">
              {files.map((file) => (
                <li key={file.name}>
                  <File
                    name={file.name}
                    size={file.size}
                    url=""
                    onDelete={() => handleDeleteFile(file.name)}
                    className="max-w-[100%]"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <M.ModalFooter className="flex items-center justify-start gap-4">
          <Button onClick={handleUploadFiles}>Загрузить</Button>
          <Button onClick={() => onOpenChange(false)} variant="secondary">
            Отменить
          </Button>
        </M.ModalFooter>
      </M.ModalContent>
    </M.Modal>
  );
};
