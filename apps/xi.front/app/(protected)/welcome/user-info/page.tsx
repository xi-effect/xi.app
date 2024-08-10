'use client';

import { Button } from '@xipkg/button';
import React, { RefObject } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetUrlWithParams, useMedia } from 'pkg.utils.client';
import { put } from 'pkg.utils';
import { AvatarEditor } from 'pkg.avatar.editor';
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
import { Label } from '@xipkg/label';
import { FileUploader } from '@xipkg/fileuploader';
import { toast } from 'sonner';
import { useMainSt } from 'pkg.stores';
import { Logo } from 'pkg.logo';
import { Avatar, AvatarFallback, AvatarImage } from '@xipkg/avatar';

const readFile = (file: File) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });

const FormSchema = z.object({
  displayName: z.string({
    required_error: 'Обязательное поле',
  }),
});

type RequestBody = {
  display_name: string;
};

type ResponseBody = {
  detail: string;
};

type AvatarPreviewPropsT = {
  date: RefObject<{}>;
  userId: number | null;
};

const AvatarPreview = ({ date, userId }: AvatarPreviewPropsT) => (
  <Avatar size="xl">
    <AvatarImage
      src={`https://auth.xieffect.ru/api/users/${userId}/avatar.webp?=${date.current instanceof Date ? date.current.getTime() : ''}`}
      imageProps={{
        src: `https://auth.xieffect.ru/api/users/${userId}/avatar.webp?=${date.current instanceof Date ? date.current.getTime() : ''}`,
        alt: 'avatar user',
      }}
      alt="user avatar"
    />
    <AvatarFallback size="xl" />
  </Avatar>
);

export default function WelcomeUserInfo() {
  const user = useMainSt((state) => state.user);
  const updateUser = useMainSt((state) => state.updateUser);

  const socket = useMainSt((state) => state.socket);

  const searchParams = useSearchParams();

  const isMobile = useMedia('(max-width: 960px)');

  const [isAvatarEditorOpen, setIsAvatarEditorOpen] = React.useState(false);
  const [file, setFile] = React.useState<any>();

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

  const router = useRouter();
  const getUrlWithParams = useGetUrlWithParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      displayName: '',
    },
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = form;

  const watchNickname = watch('displayName');

  const onSubmit = async ({ displayName }: z.infer<typeof FormSchema>) => {
    const { status } = await put<RequestBody, ResponseBody>({
      service: 'auth',
      path: '/api/onboarding/stages/community-choice/',
      body: {
        display_name: displayName,
      },
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    if (status === 204) {
      if (socket && socket.connected === false) {
        socket.connect();
      }

      updateUser({ onboardingStage: 'community-choice' });

      if (searchParams.has('iid') && searchParams.has('community')) {
        router.push(getUrlWithParams(
          `/welcome/community?iid=${searchParams.get('iid')}&community=${searchParams.get('community')}`,
        ));
      } else {
        router.push(getUrlWithParams('/welcome/community'));
      }
    } else {
      toast('Ошибка сервера');
    }
  };

  const date = React.useRef<'' | Date>('');

  const setDate = (value: Date) => {
    date.current = value;
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
            <div className="bg-gray-10 w-1/4 h-1.5 rounded" />
            <div className="bg-gray-10 w-1/4 h-1.5 rounded" />
            <div className="bg-gray-10 w-1/4 h-1.5 rounded" />
          </div>
          <div id="title" className="mt-8 text-2xl font-semibold leading-[32px] text-gray-100">
            Давайте познакомимся
          </div>
          <div className="flex flex-row mt-8 h-16">
            <AvatarPreview userId={user.id} date={date} />
            <div className="ml-4 flex flex-col gap-2">
              <span className="font-medium leading-[22px] text-gray-90 w-full">
                Изображение профиля
              </span>
              <AvatarEditor
                file={file}
                open={isAvatarEditorOpen}
                onOpenChange={setIsAvatarEditorOpen}
                setDate={setDate}
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
                name="displayName"
                render={({ field }) => (
                  <FormItem className="mt-8">
                    <FormLabel>Отображаемое имя</FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1"
                        error={!!errors?.displayName}
                        autoComplete="off"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label className="mt-6">Электронная почта</Label>
              <div className="mt-2 leading-[22px] text-gray-50 bg-gray-10 flex flex-row w-full h-12 items-start p-3 rounded-lg">
                {user.email}
              </div>
              <div className="pt-4 mt-auto flex flex-row gap-6">
                <Button disabled={watchNickname.length === 0} type="submit" className="w-full">
                  Продолжить
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {!isMobile && (
        <div className="w-full m-w-[856px] bg-gray-5">
          <div className="pt-16 pl-16 h-full w-full relative">
            <div className="absolute h-[calc(100vh-64px)] w-full">
              <Image
                style={{
                  objectFit: 'cover',
                  objectPosition: 'left',
                }}
                alt="interface example"
                src="/assets/welcome/user-info.png"
                fill
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
