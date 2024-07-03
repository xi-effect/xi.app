/* eslint-disable @next/next/no-img-element */

'use client';

import { Button } from '@xipkg/button';
import React from 'react';
import Image from 'next/image';
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
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@xipkg/input';
import { FileUploader } from '@xipkg/fileuploader';
import { toast } from 'sonner';
import { del, put } from 'pkg.utils';
import { useMainSt } from 'pkg.stores';
import { Logo } from 'pkg.logo';
import { AvatarEditor } from 'pkg.avatar.editor';

const readFile = (file: File) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });

const FormSchema = z.object({
  community: z.string({
    required_error: 'Обязательное поле',
  }),
});

type RequestBody = {};

type ResponseBody = {
  detail: string;
};

type RequestBodyAvatar = {};

type ResponseBodyAvatar = {
  formData: FormData;
};

export default function WelcomeCommunityCreate() {
  const updateUser = useMainSt((state) => state.updateUser);
  const socket = useMainSt((state) => state.socket);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);

  const [isLoading, setIsLoading] = React.useState(false);
  const [file, setFile] = React.useState<any>();
  const [isAvatarEditorOpen, setIsAvatarEditorOpen] = React.useState(false);

  const [previewImg, setPreviewImg] = React.useState<string | null>();
  const [formData, setFormData] = React.useState<FormData | null>();

  const router = useRouter();

  const handleInput = async (files: File[]) => {
    if (!files) return;

    if (files[0].size > 5 * 1024 * 1024) {
      toast('Файл слишком большой');
      return;
    }

    const imageDataUrl = await readFile(files[0]);

    setFile(imageDataUrl);
    setIsAvatarEditorOpen(true);
  };

  const handleBack = async () => {
    const { status } = await del({
      service: 'auth',
      path: '/api/onboarding/stages/community-create/',
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    if (status === 204) {
      updateUser({ onboardingStage: 'community-choice' });
      router.back();
    } else {
      toast('Ошибка сервера');
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
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
    console.log('onSubmit', socket);
    socket?.emit(
      'create-community',
      {
        data: {
          name: community,
        },
      },
      async (status: number, { community, participant }: { community: any; participant: any }) => {
        console.log('on data', status, community);
        if (status === 200) {
          const { status } = await put<RequestBody, ResponseBody>({
            service: 'auth',
            path: '/api/onboarding/stages/completed/',
            body: {},
            config: {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          });

          updateCommunityMeta({
            id: community.id,
            isOwner: participant.is_owner,
            name: community.name,
            description: community.description,
          });

          if (status === 204) {
            updateUser({ onboardingStage: 'final' });
            router.push('/welcome/final');
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

  const handleBase64 = (base64Image: string, form: FormData) => {
    setPreviewImg(base64Image);
    setFormData(form);
    setIsAvatarEditorOpen(false);
  };

  return (
    <div className="flex flex-row justify-center content-center w-screen h-[100dvh] xs:h-screen">
      <div className="h-full w-full p-8 flex justify-center content-center">
        <div className="flex flex-col h-full xs:p-8 w-full max-w-[536px]">
          <div className="h-22">
            <Logo height={24} width={202} logoVariant="navigation" logoSize="default" />
          </div>
          <div className="mt-16 flex flex-row justify-between w-full items-start gap-4">
            <div className="bg-brand-80 w-1/4 h-1.5 rounded" />
            <div className="bg-brand-80 w-1/4 h-1.5 rounded" />
            <div className="bg-brand-80 w-1/4 h-1.5 rounded" />
            <div className="bg-gray-10 w-1/4 h-1.5 rounded" />
          </div>
          <div id="title" className="mt-8 text-2xl font-semibold leading-[32px] text-gray-100">
            Создайте сообщество
          </div>
          <div className="flex flex-row mt-8 h-16">
            {previewImg ? (
              <img
                className="rounded-[32px] shrink-0 w-16 h-16 bg-brand-80"
                alt="community avatar preview"
                src={previewImg}
              />
            ) : (
              <div className="rounded-[32px] shrink-0 w-16 h-16 bg-brand-80" />
            )}
            <div className="ml-4 flex flex-col gap-2">
              <span className="font-medium leading-[22px] text-gray-90 w-full">
                Изображение сообщества
              </span>
              <AvatarEditor
                file={file}
                open={isAvatarEditorOpen}
                onOpenChange={setIsAvatarEditorOpen}
                withLoadingToServer={false}
                onBase64Return={handleBase64}
              />
              <FileUploader
                onChange={handleInput}
                extensions={['webp', 'jpg', 'png']}
                withError={false}
                withLargeError={false}
                size="small"
              />
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex flex-col">
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
              <div className="pt-4 mt-auto flex flex-row gap-6">
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
      <div className="hidden md:flex w-full m-w-[856px] bg-gray-5">
        <div className="pt-16 pl-16 h-full w-full relative">
          <div className="absolute h-[calc(100vh-64px)] w-full">
            <Image
              style={{
                objectFit: 'cover',
                objectPosition: 'left',
              }}
              alt="interface example"
              src="/assets/welcome/community-add.png"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
}
