/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { post } from 'pkg.utils';
import { Button } from '@xipkg/button';
import { Input } from '@xipkg/input';
import { FileUploader } from '@xipkg/fileuploader';
import { Form, FormControl, FormField, FormItem, FormMessage, useForm } from '@xipkg/form';
import { type CustomEditor } from 'pkg.module.editor/slate';
import { resizeFile, getCompressedFile } from './utils';

export type StageType = 'load' | 'link';

type AddFilePopoverT = {
  createDefaultNode: (type: string, url?: string, fileName?: string, size?: number) => any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFileAttached: (newNode?: CustomEditor | undefined) => void;
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

  const handleInputChange = (files: FileList | null) => {
    if (files && files.length) handleFileUpload(files[0]);
  };

  // загрузка изображения на сервер
  const getImageResponse = async (imageFile: File) => {
    // @ts-ignore
    let webpImage: File = await resizeFile(imageFile);
    if (webpImage.size > 1024 * 1024) {
      webpImage = await getCompressedFile(webpImage);
    }
    const formData = new FormData();
    formData.append('image', webpImage);

    const {
      data,
      status,
    }: {
      data: {
        creator_user_id: number;
        id: string;
        kind: string;
        name: string;
      };
      status: number;
    } = await post({
      service: 'backend',
      path: '/api/protected/storage-service/files/images/',
      body: formData,
      config: {
        headers: {},
      },
    });
    return { data, status };
  };

  // Загрузка вложения
  const handleFileUpload = async (uploadedFile: File) => {
    let newNode;

    switch (type) {
      case 'image':
        try {
          const { data } = await getImageResponse(uploadedFile);
          newNode = createDefaultNode('imageBlock', data.id);
        } catch (error) {
          toast('Не удалось загрузить изображение, попробуйте другое');
          throw error;
        }
        break;
      case 'file':
        console.log(uploadedFile);
        break;
      case 'video':
        console.log(uploadedFile);
        break;
      default:
        throw new Error('Unknown type');
    }

    // @ts-ignore
    handleFileAttached(newNode);
    setOpen(false);
  };

  // Загрузка по ссылке
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

          // получаем изображение, его название и размер
          const blob = await response.blob();
          fileName = getFileNameFromURL(inputData.fileLink);
          fileSize = blob.size;

          // преобразуем в File, готовим к отправке на сервер и получаем ответ с id картинки
          const imageFile = new File([blob], `${fileName}.webp`);
          const { data } = await getImageResponse(imageFile);

          // создаем новый DOM-объект, используя полученный с сервера id
          newNode = createDefaultNode('imageBlock', data.id, fileName, fileSize);
        } catch (error) {
          toast('Не удалось загрузить изображение, попробуйте другое');
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
    handleFileAttached(newNode);
    setOpen(false);
  };

  const [stage, setStage] = useState<StageType>('load');

  return (
    <div className="">
      <div className="mb-4 flex">
        <div>
          <label
            htmlFor="uploadImageInput"
            onClick={() => setStage('load')}
            onKeyUp={() => setStage('load')}
            className={`border-box inline-flex h-8 cursor-pointer items-center justify-center whitespace-nowrap rounded-md border px-3 pb-[2px] text-sm font-medium ${
              stage === 'load'
                ? 'bg-brand-80 hover:bg-brand-100 active:bg-brand-100 focus:bg-brand-100 text-gray-0 dark:text-gray-100'
                : 'bg-gray-0 hover:bg-gray-5 active:bg-gray-5 focus:bg-gray-5 border-0 text-gray-100'
            }`}
          >
            Загрузить
            <input
              id="uploadImageInput"
              accept="image/*"
              onChange={(e) => handleInputChange(e.target.files)}
              className="sr-only"
              type="file"
            />
          </label>
        </div>
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
          <FileUploader onChange={(files) => handleFileUpload(files[0])} />
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
