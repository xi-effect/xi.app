/* eslint-disable camelcase */
import React from 'react';
import { IBM_Plex_Mono } from 'next/font/google';
import { type CustomRenderElementProps } from './RenderElement';
import { CustomText } from '../slate';

type CodePropsT = CustomRenderElementProps;

const codeFont = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

export const Code = ({ element, children, attributes }: CodePropsT) => {
  const isEmpty =
    element.children &&
    (element.children[0] as CustomText).text === '' &&
    element.children.length === 1;

  return (
    <div
      className={`${codeFont.className} text-s-base border-gray-10 text-sm" block w-full whitespace-pre-wrap break-words rounded-lg border p-4`}
      {...attributes}
    >
      {isEmpty && (
        <span className="text-gray-30 pointer-events-none absolute font-medium">
          Введите фрагмент кода
        </span>
      )}
      {children}
    </div>
  );
};
