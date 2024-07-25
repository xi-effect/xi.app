import React from 'react';
import { type CustomRenderElementProps } from './RenderElement';
import { CustomText } from '../slate';

type CodePropsT = CustomRenderElementProps;

export const Code = ({ element, children, attributes }: CodePropsT) => {
  const isEmpty =
    element.children &&
    (element.children[0] as CustomText).text === '' &&
    element.children.length === 1;

  return (
    <div className="border-gray-10 block w-full rounded-lg border p-4 text-sm" {...attributes}>
      {isEmpty && (
        <span className="text-gray-30 pointer-events-none absolute font-medium">
          Введите фрагмент кода
        </span>
      )}
      {children}
    </div>
  );
};
