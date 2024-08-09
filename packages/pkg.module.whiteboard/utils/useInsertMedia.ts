import { DEFAULT_SUPPORTED_MEDIA_TYPE_LIST, useEditor } from '@tldraw/editor';
import { useCallback, useEffect, useRef } from 'react';
import { myAssetStore } from './imageStore';
import { get } from 'pkg.utils/fetch';

export function useInsertMedia() {
  const editor = useEditor();
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = DEFAULT_SUPPORTED_MEDIA_TYPE_LIST;
    input.multiple = true;
    inputRef.current = input;

    async function handleFileChange(e: Event) {
      const fileList = (e.target as HTMLInputElement).files;
      if (!fileList || fileList.length === 0) return;

      try {
        const filesArray: File[] = await Promise.all(
          Array.from(fileList).map(async (file) => {
            const url = await myAssetStore.upload(null, file);
            const { data, status } = await get<any>({
              service: 'backend',
              path: url,
            });
            if (status !== 200) {
              throw new Error(`Status is ${status} in useInsertMedia`);
            }

            return file;
          }),
        );

        editor.putExternalContent({
          type: 'files',
          files: filesArray,
          point: editor.getViewportPageBounds().center,
          ignoreParent: false,
        });

        input.value = '';
      } catch (error) {
        console.error('Ошибка при загрузке или обработке файлов:', error);
      }
    }

    input.addEventListener('change', handleFileChange);
    return () => {
      input.removeEventListener('change', handleFileChange);
      inputRef.current = undefined;
    };
  }, [editor]);

  return useCallback(() => {
    inputRef.current?.click();
  }, []);
}
