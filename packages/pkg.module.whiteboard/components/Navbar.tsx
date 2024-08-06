import React, { ChangeEvent, useRef } from 'react';
import { TLAssetId, TLImageAsset, track, useEditor } from 'tldraw';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@xipkg/tooltip';
import { NavbarAction } from './NavbarAction';
import { MenuPopupContent } from './MenuPopupContent';
import { post } from 'pkg.utils/fetch';
import { navBarElements, NavbarElementT } from '../navBarElements';
import { toast } from 'sonner';

type MediaResponseT = {
  creator_user_id: string;
  id: string;
  kind: string;
  name: string;
};

export const Navbar = track(() => {
  const WORKER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL_BACKEND}/api/protected/storage-service/files/`;
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const editor = useEditor();
  const [inputKey, setInputKey] = React.useState(1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleMenuEditClick = () => {
    inputRef.current?.click();
  };

  const handleInput = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];

    if (file.size > 5 * 1024 * 1024) {
      toast('Файл слишком большой');
      return;
    }

    const formData = new FormData();
    formData.append('attachment', file);

    try {
      const { data, status } = await post<unknown, MediaResponseT>({
        service: 'backend',
        path: '/api/protected/storage-service/files/attachments/',
        body: formData,
      });
      console.log(status, data);

      if (status !== 201) {
        throw new Error('Ошибка загрузки файла');
      }

      toast('Файл успешно загружен');
      const id = data.id;
      const url = `${WORKER_URL}${id}`;

      // Create TLImageAsset object
      const imageAsset: TLImageAsset = {
        typeName: 'asset',
        id: ('asset:' + id) as TLAssetId,
        type: 'image',
        props: {
          fileSize: file.size,
          h: 300,
          isAnimated: false,
          mimeType: file.type,
          name: file.name,
          src: url,
          w: 300,
        },
        meta: {},
      };

      // Add the asset to the Tldraw editor
      editor.createAssets([imageAsset]);

      console.log('Uploaded file:', data);
    } catch (error) {
      toast('Ошибка загрузки файла');
      console.error('File upload error:', error);
    }

    setInputKey(Math.random());
  };

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute bottom-3 left-0 right-0 z-30 flex w-full items-center justify-center">
        <div className="z-30 flex gap-7">
          <div className="border-gray-10 bg-gray-0 z-30 rounded-[12px] border p-2">
            <NavbarAction />
          </div>
          <div className="border-gray-10 bg-gray-0 flex gap-10 rounded-[12px] border">
            <div className="flex gap-2 p-1">
              {navBarElements.map((item: NavbarElementT) => {
                const isActive = editor.getCurrentToolId() === item.action;
                return (
                  <TooltipProvider key={item.action}>
                    <Tooltip open={isActive && item?.hasAToolTip && isTooltipOpen}>
                      <TooltipTrigger className="rounded-[8px]">
                        <button
                          type="button"
                          className={`pointer-events-auto flex h-[32px] w-[32px] items-center justify-center rounded-[8px] ${isActive ? 'bg-brand-0' : 'bg-gray-0'}`}
                          data-isactive={isActive}
                          onClick={() => {
                            if (item.action !== 'asset') {
                              setIsTooltipOpen(true);
                              editor.setCurrentTool(item.action);
                            } else {
                              handleMenuEditClick();
                            }
                          }}
                        >
                          {item.icon ? item.icon : item.title}
                        </button>
                        <input
                          className="hidden"
                          ref={inputRef}
                          onChange={handleInput}
                          type="file"
                          key={inputKey}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="border-gray-10 bg-gray-0 mb-1 flex gap-10 rounded-[12px] border p-1 shadow-none">
                        <MenuPopupContent item={item} setIsTooltipOpen={setIsTooltipOpen} />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
