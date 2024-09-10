import React from 'react';
import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { type CustomRenderElementProps } from './RenderElement';
import { CustomText } from '../slate';

type ImageBlockPropsT = CustomRenderElementProps;

export const ImageBlock = ({ element, children, attributes }: ImageBlockPropsT) => {
  const isEmpty =
    element.children &&
    (element.children[0] as CustomText).text === '' &&
    element.children.length === 1;

  const sortable = useSortable({
    id: element.id,
    transition: {
      duration: 350,
      easing: 'ease',
    },
  });

  // Размер изображения в зависимости от ширины исходника.
  // Подумать, как связать с max-h, либо убрать вообще
  // const [imageWidth, setImageWidth] = useState('');
  // useEffect(() => {
  //   const screenHeight = window.screen.availHeight;
  //   const img = new Image();
  //   img.src = `${process.env.NEXT_PUBLIC_SERVER_URL_BACKEND}/api/protected/storage-service/files/${element.url}/`;
  //   img.onload = () => {
  //   if (img.width > 200 && img.height < (screenHeight * 0.7)) {
  //     setImageWidth('w-full');
  //   } else {
  //     setImageWidth('w-auto');
  //   }
  //   };
  // }, [imageWidth]);

  return (
    <figure {...sortable.listeners}>
      <Image
        alt={(element.children[0] as CustomText).text || 'Подпись изображения'}
        src={`${process.env.NEXT_PUBLIC_SERVER_URL_BACKEND}/api/protected/storage-service/files/${element.url}/`}
        className="border-gray-10 mx-auto h-auto max-h-[70dvh] w-auto rounded-lg border cursor-pointer"
        width={400}
        height={225}
        {...attributes}
        unoptimized
      />
      <figcaption className="text-gray-30 border-gray-30 relative mt-2 rounded-md border p-2 text-sm">
        {isEmpty && (
          <span className="pointer-events-none absolute" contentEditable={false}>
            Подпись изображения
          </span>
        )}
        {children}
      </figcaption>
    </figure>
  );
};
