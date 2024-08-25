import React from 'react';
import { IBM_Plex_Mono as ibmPlexMono } from 'next/font/google';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@xipkg/select';
import { type CustomRenderElementProps } from './RenderElement';
import { CustomText } from '../slate';
import { defaultLanguage, languages } from '../const/codeEditorLanguages';
import { useCodeLanguage } from '../hooks/useCodeLanguage';

type CodePropsT = CustomRenderElementProps;

const codeFont = ibmPlexMono({
  weight: ['400', '500', '600'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

export const Code = ({ element, children, attributes }: CodePropsT) => {
  const { setLanguage } = useCodeLanguage();

  const isEmpty =
    element.children &&
    (element.children[0] as CustomText).text === '' &&
    element.children.length === 1;

  const handleChangeLanguage = (value: string) => {
    setLanguage(element, value);
  };

  return (
    <div
      className="text-s-base border-gray-10 bg-gray-0 relative block w-full whitespace-pre-wrap break-words rounded-lg border p-4"
      {...attributes}
    >
      <Select
        defaultValue={element.language || defaultLanguage}
        onValueChange={handleChangeLanguage}
      >
        <SelectTrigger
          contentEditable={false}
          className="text-xs-base mb-2 h-auto w-auto gap-1 border-none p-0"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          {Object.entries(languages).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className={`${codeFont.className}`}>
        {isEmpty && (
          <span className="text-gray-30 pointer-events-none absolute font-medium">
            Введите фрагмент кода
          </span>
        )}
        {children}
      </div>
    </div>
  );
};
