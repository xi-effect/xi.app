import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { ReactNode } from 'react';

export type CustomElementByType<T extends CustomElementType> = Extract<CustomElement, { type: T }>;

type CustomText = { id: string; text: string; bold?: true };

type CustomElement = {
  children: Array<CustomText | CustomElement>;
  id: string;
} & (
  | { type: CommonCustomElementType }
  | { type: 'image'; url: string }
  | { type: 'icon'; icon: ReactNode }
);

// Элементы без дополнительных свойств
type CommonCustomElementType =
  | 'paragraph'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'quote'
  | 'bulleted-list'
  | 'numbered-list'
  | 'list-item'
  | 'quote'
  | 'tip'
  | 'divider';
type CustomElementType = CustomElement['type'];

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor & { id: string };
declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
