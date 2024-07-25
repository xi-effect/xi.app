import React from 'react';
import { type CustomRenderElementProps } from './RenderElement';
import { CustomText } from '../slate';

type QuoteTextPropsT = CustomRenderElementProps;

export const QuoteText = ({ element, children, attributes }: QuoteTextPropsT) => {
  const isEmpty =
    element.children &&
    (element.children[0] as CustomText).text === '' &&
    element.children.length === 1;

  return (
    <div className="relative text-base font-medium" {...attributes}>
      {isEmpty && (
        <span className="text-gray-30 pointer-events-none absolute left-0 top-0">
          Введите текст цитаты
        </span>
      )}
      {children}
    </div>
  );
};
