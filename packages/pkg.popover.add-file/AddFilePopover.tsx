/* eslint-disable no-irregular-whitespace */

'use client';

import React, { useState } from 'react';

import { Transforms } from 'slate';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { post } from 'pkg.utils';
import Resizer from 'react-image-file-resizer';
import { Button } from '@xipkg/button';
import { Input } from '@xipkg/input';
import { FileUploader } from '@xipkg/fileuploader';
import { Form, FormControl, FormField, FormItem, FormMessage, useForm } from '@xipkg/form';

import { type CustomEditor } from 'pkg.module.editor/slate';

export type StageType = 'load' | 'link';

type AddFilePopoverT = {
  createDefaultNode: (type: string, url?: string, fileName?: string, size?: number) => any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFileAttached: () => void;
  type: 'image' | 'file' | 'video';
  editor: CustomEditor;
};

const getFileNameFromURL = (url: string) => {
  const parts = url.split('/');
  return parts.length > 0 ? parts.pop()?.split('?')[0] : '';
};

// У каждого хостинга разная структура ссылки для iframe
const getYouTubeVideoId = (url: string) => url.split('/').pop()?.split('?')?.pop()?.split('=')[1];

const getVimeoVideoId = (url: string): string => url.split('/')[3];

const getRuTubeVideoId = (url: string): string => url.split('/')[4];

const getVideoEmbedUrl = (url: string): string => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = getYouTubeVideoId(url);
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('vimeo.com')) {
    const videoId = getVimeoVideoId(url);
    return `https://player.vimeo.com/video/${videoId}`;
  }
  if (url.includes('rutube.ru')) {
    const videoId = getRuTubeVideoId(url);
    return `https://rutube.ru/play/embed/${videoId}`;
  }
  return '';
};

export const AddFilePopover = ({
  createDefaultNode,
  setOpen,
  handleFileAttached,
  type,
  editor,
}: AddFilePopoverT) => {
  const FormSchema = z.object({
    fileLink: z.string().url('Введите корректную ссылку').min(1, 'Ссылка обязательна'),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fileLink: '',
    },
  });

  const { control, handleSubmit } = form;

  // тут используется для преобразования изображения в webp
  const resizeFile = (file: File, type: 'blob' | 'base64') =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1920,
        1920,
        'WEBP',
        100,
        0,
        (url) => {
          resolve(url);
        },
        type,
      );
    });

  const onSubmit = async (inputData: z.infer<typeof FormSchema>) => {
    let newNode;
    let fileName;
    let fileSize;

    switch (type) {
      case 'image':
        try {
          const response = await fetch(inputData.fileLink);
          if (!response.ok) {
            toast('Ошибка соединия при загрузке изображения');
          }

          const blob = await response.blob();
          const imageFile = new File([blob], `${fileName}.webp`);
          const webpImage = (await resizeFile(imageFile, 'blob')) as Blob;

          fileName = await getFileNameFromURL(inputData.fileLink);
          const formData = new FormData();
          formData.append('image', webpImage, `${fileName}.webp`);

          type responseT = {
            data: {
              creator_user_id: number;
              id: string;
              kind: string;
              name: string;
            };
            status: number;
          };

          const { data }: responseT = await post({
            service: 'backend',
            path: '/api/protected/storage-service/files/images/',
            body: formData,
            config: {
              headers: {},
            },
          });
          newNode = createDefaultNode('imageBlock', data.id);
        } catch (error) {
          console.error('Upload error:', error);
          throw error;
        }
        break;
      case 'file':
        try {
          const response = await fetch(inputData.fileLink);
          if (!response.ok) {
            toast('Ошибка соединия при загрузке файла');
          }
          const blob = await response.blob();
          fileName = getFileNameFromURL(inputData.fileLink);
          fileSize = blob.size;
          newNode = createDefaultNode('fileBlock', inputData.fileLink, fileName, fileSize);
        } catch (error) {
          toast('Не удалось загрузить файл, попробуйте другой');
          return;
        }
        break;
      case 'video':
        if (!getVideoEmbedUrl(inputData.fileLink)) {
          toast('Не удалось распознать ссылку на видео'); // когда появится блок с закладкой, можно превращать ссылку в него, если не удалось распознать видео
          return;
        }
        newNode = createDefaultNode('videoBlock', inputData.fileLink);

        break;
      default:
        throw new Error('Unknown type');
    }
    // @ts-ignore
    Transforms.insertNodes(editor, newNode);
    handleFileAttached();
    setOpen(false);
  };

  const [stage, setStage] = useState<StageType>('load');

  return (
    <div className="">
      <div className="mb-4 flex">
        <Button
          onClick={() => setStage('load')}
          variant={stage === 'load' ? 'default' : 'ghost'}
          size="s"
        >
          Загрузить
        </Button>
        <Button
          onClick={() => setStage('link')}
          variant={stage === 'link' ? 'default' : 'ghost'}
          size="s"
        >
          Вставить ссылку
        </Button>
      </div>
      {stage === 'load' ? (
        <div className="min-w-96 max-[900px]:min-w-full">
          <FileUploader onChange={(files) => console.log(files)} />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex h-full w-full">
            <FormField
              control={control}
              name="fileLink"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="">
                  <FormControl>
                    <Input
                      className="border-gray-30 text-gray-30 h-8 min-w-72 rounded-lg border text-sm max-[900px]:min-w-full"
                      error={!!error}
                      autoComplete="off"
                      type="url"
                      placeholder="Вставьте ссылку на изображение"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="default" type="submit" size="s" className="ml-2">
              Добавить
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
