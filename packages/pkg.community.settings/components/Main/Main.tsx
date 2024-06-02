/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, useRef } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Edit, Trash } from '@xipkg/icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@xipkg/form';
import { AvatarEditor } from 'pkg.avatar.editor';
import { Avatar, AvatarFallback, AvatarImage } from '@xipkg/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import { del } from 'pkg.utils/fetch';
import { Input } from '@xipkg/input';
import { useSnackbar } from 'notistack';
import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';
import { useInterfaceStore } from '../../interfaceStore';

const FormSchema = z.object({
  name: z.string({
    required_error: 'Обязательное поле',
  }),
});

export const Main = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const setIsCloseActive = useInterfaceStore((state) => state.setIsCloseActive);
  const communityName = useMainSt((state) => state.communityMeta.name);
  const communityId = useMainSt((state) => state.communityMeta.id);
  const socket = useMainSt((state) => state.socket);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);
  const [isAvatarOpen, setIsAvatarOpen] = React.useState(false);
  const [inputKey, setInputKey] = React.useState(1);
  const [file, setFile] = React.useState<any>();
  const date = React.useRef<'' | Date>('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: communityName || '',
    },
  });

  const {
    control,
    // setError,
    handleSubmit,
    watch,
    reset,
    // trigger,
    // formState: { errors },
  } = form;

  watch((data) => {
    if (data.name !== communityName) {
      setIsCloseActive(false);
      enqueueSnackbar('Your report is ready', {
        variant: 'confirmSave',
        persist: true,
        onReset: () => reset(),
      });
    } else {
      setIsCloseActive(true);
      closeSnackbar();
    }
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    socket.emit(
      'update-community',
      {
        community_id: communityId,
        data: {
          description: null,
          name: data.name,
        },
      },
      (status: number) => {
        if (status === 200) {
          updateCommunityMeta({ name: data.name });
          setIsCloseActive(true);
          closeSnackbar();
          toast('Название сообщества сохранено');
        }
      },
    );
  };

  const handleMenuEditClick = () => {
    inputRef.current?.click();
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const readFile = (file: File) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });

  const handleInput = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    if (event.target.files[0].size > 5 * 1024 * 1024) {
      toast('Файл слишком большой');
      return;
    }

    const imageDataUrl = await readFile(event.target.files[0]);
    setFile(imageDataUrl);
    setIsAvatarOpen(true);
    setInputKey(Math.random());
  };

  const handleDeleteAvatar = async () => {
    const { status } = await del({
      service: 'backend',
      path: `/api/protected/community-service/communities/${communityId}/avatar/`,
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    if (status === 204) {
      toast('Аватарка удалена. Скоро она исчезнет с сайта');
    }
  };

  return (
    <Form {...form}>
      <div className="border-gray-80 flex w-full rounded-2xl border p-6">
        <AvatarEditor
          file={file}
          open={isAvatarOpen}
          onOpenChange={setIsAvatarOpen}
          communityId={communityId || undefined}
        />
        <input className="hidden" ref={inputRef} onChange={handleInput} type="file" key={inputKey} />
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Avatar size="xxl">
              <AvatarImage
                src={`https://api.xieffect.ru/files/communities/${communityId}/avatar.webp?=${date.current instanceof Date ? date.current.getTime() : ''}`}
                imageProps={{
                  src: `https://api.xieffect.ru/files/communities/${communityId}/avatar.webp?=${date.current instanceof Date ? date.current.getTime() : ''}`,
                  alt: 'community avatar',
                  }}
                alt="community avatar"
              />
              <AvatarFallback
                size="xxl"
                className='bg-gray-5 rounded-[36px]" flex h-[128px] w-[128px] place-items-center justify-center'
              >
                <Camera size="l" className="fill-gray-60" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[220px]">
            <DropdownMenuItem onClick={handleMenuEditClick}>
              <Edit className="mr-2 h-5 w-5" />
              <span className="text-[14px]">Обновить фотографию</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteAvatar}>
              <Trash className="mr-2 h-5 w-5" />
              <span className="text-[14px]">Удалить</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <form
          id="community-settings-main-page-form"
          onSubmit={handleSubmit(onSubmit)}
          className="ml-8 flex flex-col justify-start gap-0.5"
        >
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название сообщества</FormLabel>
                <FormControl className="mt-2">
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </div>
    </Form>
  );
};
