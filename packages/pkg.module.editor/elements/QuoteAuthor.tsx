import React from 'react';
import { type CustomRenderElementProps } from './RenderElement';
import { CustomText } from '../slate';

type QuoteAuthorPropsT = CustomRenderElementProps;

export const QuoteAuthor = ({ element, children, attributes }: QuoteAuthorPropsT) => {
  const isEmpty =
    element.children &&
    (element.children[0] as CustomText).text === '' &&
    element.children.length === 1;

  return (
    <cite className="text-gray-80 relative text-xs not-italic" {...attributes}>
      {isEmpty && (
        <span className="text-gray-30 pointer-events-none absolute left-0 top-0 w-20">
          Автор цитаты
        </span>
      )}
      {children}
    </cite>
  );
};
