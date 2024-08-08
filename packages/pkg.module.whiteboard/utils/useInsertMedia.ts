import { DEFAULT_SUPPORTED_MEDIA_TYPE_LIST, useEditor } from '@tldraw/editor';
import { useCallback, useEffect, useRef } from 'react';
import { myAssetStore } from './imageStore';
import { TLAsset, uniqueId, TLAssetId } from 'tldraw';
import { get } from 'pkg.utils/fetch';

export function useInsertMedia() {
  const editor = useEditor();
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const input = window.document.createElement('input');
    input.type = 'file';
    input.accept = DEFAULT_SUPPORTED_MEDIA_TYPE_LIST;
    input.multiple = true;
    inputRef.current = input;

    async function onchange(e: Event) {
      const fileList = (e.target as HTMLInputElement).files;
      if (!fileList || fileList.length === 0) return;

      const uploadedFiles = await Promise.all(
        Array.from(fileList).map(async (file) => {
          const asset: TLAsset = {
            typeName: 'asset',
            id: uniqueId() as TLAssetId, // Generate a unique ID for the asset
            type: 'image', // Assuming this is an image asset
            props: {
              fileSize: file.size,
              h: 300, // Example height
              isAnimated: false,
              mimeType: file.type,
              name: file.name,
              src: '', // Will be set after upload
              w: 300, // Example width
            },
            meta: {},
          };

          const url = await myAssetStore.upload(asset, file);

          const { data, status } = await get<any>({
            service: 'backend',
            path: url,
          });
          if (status !== 200) {
            throw new Error(`Status is ${status} in useInsertMedia`);
          }
          const newFile = new File([data], file.name, {
            type: file.type,
            lastModified: file.lastModified,
          });

          return newFile;
        }),
      );

      editor.putExternalContent({
        type: 'files',
        files: uploadedFiles,
        point: editor.getViewportPageBounds().center,
        ignoreParent: false,
      });

      input.value = '';
    }

    input.addEventListener('change', onchange);
    return () => {
      inputRef.current = undefined;
      input.removeEventListener('change', onchange);
    };
  }, [editor]);

  return useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);
}
