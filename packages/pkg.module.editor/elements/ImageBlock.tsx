import React from 'react';
import { type CustomRenderElementProps } from './RenderElement';
import { CustomText } from '../slate';

type ImageBlockPropsT = CustomRenderElementProps;

export const ImageBlock = ({ element, children, attributes }: ImageBlockPropsT) => {
  const isEmpty =
    element.children &&
    (element.children[0] as CustomText).text === '' &&
    element.children.length === 1;

  return (
    <figure>
      <img
        alt={(element.children[0] as CustomText).text || 'Подпись изображения'}
        src={element.url}
        className="border-gray-10 w-full rounded-lg border"
        {...attributes}
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
