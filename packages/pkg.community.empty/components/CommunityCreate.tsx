'use client';

import React from 'react';
import { Button } from '@xipkg/button';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@xipkg/form';
import { Input } from '@xipkg/input';
import { FileUploader } from '@xipkg/fileuploader';
import { AvatarEditor } from 'pkg.avatar.editor';
import { useMainSt } from 'pkg.stores';
import { Logo } from 'pkg.logo';
import { put } from 'pkg.utils';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { StageType } from '../EmptyCommunity';
import { JoinResponseT, RequestBodyAvatar, ResponseBodyAvatar } from '../types';

type CommunityCreateProps = {
  setStage: (stage: React.SetStateAction<StageType>) => void;
  setTab: (tab: React.SetStateAction<number>) => void;
};

const FormSchema = z.object({
  community: z.string({
    required_error: 'Обязательное поле',
  }),
});

export default function CommunityCreate({ setStage, setTab }: CommunityCreateProps) {
  const [file, setFile] = React.useState<string | null>(null);
  const [isAvatarEditorOpen, setIsAvatarEditorOpen] = React.useState(false);

  const [previewImg, setPreviewImg] = React.useState<string | null>();
  const [formData, setFormData] = React.useState<FormData | null>();

  const [isLoading, setIsLoading] = React.useState(false);

  const socket = useMainSt((state) => state.socket);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);

  const router = useRouter();

  const handleBack = () => {
    setStage('notFound');
    setTab(0);
  };

  const handleBase64 = (base64Image: string, form: FormData) => {
    setPreviewImg(base64Image);
    setFormData(form);
    setIsAvatarEditorOpen(false);
  };

  const handleFileInput = async (files: File[]) => {
    if (!files) return;

    if (files[0].size > 5 * 1024 * 1024) {
      toast('Файл слишком большой');
      return;
    }

    const readFile = (file: File) =>
      new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result as string), false);
        reader.readAsDataURL(file);
      });

    const imageDataUrl = await readFile(files[0]);

    setFile(imageDataUrl);
    setIsAvatarEditorOpen(true);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    // @ts-expect-error TODO: Разобраться с типами
    resolver: zodResolver(FormSchema),
    defaultValues: {
      community: '',
    },
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = form;

  const watchCommunity = watch('community');

  const onSubmit = ({ community }: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    socket?.emit(
      'create-community',
      {
        data: {
          name: community,
        },
      },
      async (status: number, { community, participant }: JoinResponseT) => {
        if (status === 200) {
          updateCommunityMeta({
            id: community.id,
            isOwner: participant.is_owner,
            name: community.name,
            description: community.description,
          });

          if (community) {
            router.push(`/communities/${community.id}/home`);
          } else {
            toast('Ошибка сервера');
          }

          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast('Ошибка при создании сообщества');
        }

        if (status === 200 && formData && community.id) {
          const { status } = await put<RequestBodyAvatar, ResponseBodyAvatar>({
            service: 'backend',
            path: `/api/protected/community-service/communities/${community.id}/avatar/`,
            body: formData,
            config: {
              headers: {},
            },
          });

          if (status !== 204) {
            toast('Ошибка сервера при сохранении аватара сообщества');
          }
        }
      },
    );
  };

  return (
    <div className="flex h-full w-full content-center justify-center p-8">
      <div className="xs:p-8 flex h-full w-full max-w-[536px] flex-col">
        <div className="h-22">
          <Logo height={24} width={202} logoVariant="navigation" logoSize="default" />
        </div>
        <div className="mt-16 flex w-full flex-row items-start justify-between gap-4">
          <div className="bg-brand-80 h-1.5 w-1/2 rounded" />
          <div className="bg-brand-80 h-1.5 w-1/2 rounded" />
        </div>
        <div id="title" className="mt-8 text-2xl font-semibold leading-[32px] text-gray-100">
          Создайте сообщество
        </div>
        <div className="mt-8 flex h-16 flex-row">
          {previewImg ? (
            <Image
              className="bg-brand-80 h-16 w-16 shrink-0 rounded-[32px]"
              alt="community avatar preview"
              src={previewImg}
              width={64}
              height={64}
            />
          ) : (
            <div className="bg-brand-80 h-16 w-16 shrink-0 rounded-[32px]" />
          )}{' '}
          <div className="ml-4 flex flex-col gap-2">
            <span className="text-gray-90 w-full font-medium leading-[22px]">
              Изображение сообщества
            </span>
            <AvatarEditor
              file={file}
              open={isAvatarEditorOpen}
              onOpenChange={setIsAvatarEditorOpen}
              withLoadingToServer={false}
              onBase64Return={handleBase64}
            />
            <FileUploader size="small" onChange={handleFileInput} accept="image/*" />
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex h-full w-full flex-col">
            <FormField
              control={control}
              name="community"
              render={({ field }) => (
                <FormItem className="mt-8">
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      error={!!errors?.community}
                      autoComplete="off"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-auto flex flex-row gap-6 pt-4">
              <Button
                disabled={isLoading}
                onClick={handleBack}
                variant="ghost"
                className="w-[98px]"
              >
                Назад
              </Button>
              {isLoading ? (
                <Button disabled variant="default-spinner" type="submit" className="w-full" />
              ) : (
                <Button disabled={watchCommunity.length === 0} type="submit" className="w-full">
                  Продолжить
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
