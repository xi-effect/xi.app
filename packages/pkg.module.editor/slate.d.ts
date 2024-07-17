import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { ReactNode } from 'react';

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor & { id: string };

type CustomElement = {
  children: Array<CustomText | CustomElement>;
  id: string;
  type: CustomElementType;
};

export type ParagraphElement = {
  id: string;
  type: 'paragraph';
  children: CustomText[];
};

export type HeadingElement = {
  id: string;
  type: 'heading1' | 'heading2' | 'heading3' | 'mainTitle';
  children: CustomText[];
};

export type ListElement = {
  id: string;
  type: 'bulleted-list' | 'numbered-list';
  children: CustomText[];
};

export type ListItemElement = {
  id: string;
  type: 'list-item';
  children: (CustomElement | CustomText)[];
};

export type QuoteElement = {
  id: string;
  type: 'quote' | 'quoteText' | 'quoteAuthor';
  children: (CustomElement | CustomText)[];
};

export type MediaElement = {
  id: string;
  type: 'imageBlock' | 'videoBlock' | 'fileBlock';
  url: string;
  fileName?: string;
  size?: number;
  children: CustomText[];
};

export type LinkElement = {
  id: string;
  type: 'link';
  url: string;
  children: CustomText[];
};

export type IconElement = {
  id: string;
  type: 'icon';
  icon: ReactNode;
};

export type DividerElement = {
  id: string;
  type: 'divider';
  children: CustomText[];
};

export type CodeElement = {
  id: string;
  type: 'code';
};

export type TipElement = {
  id: string;
  type: 'tip';
  children: (CustomElement | CustomText | IconElement)[];
};

export type ImageElement = {
  id: string;
  type: 'image';
  children: CustomText[];
};

export type FileElement = {
  id: string;
  type: 'file';
  url: string;
  fileName?: string;
  size?: number;
  children: CustomText[];
};

export type VideoElement = {
  id: string;
  type: 'video';
  children: CustomText[];
};

export type CommonCustomElementType =
  | ParagraphElement
  | HeadingElement
  | ListElement
  | ListItemElement
  | QuoteElement
  | MediaElement
  | LinkElement
  | IconElement
  | DividerElement
  | CodeElement
  | TipElement
  | ImageElement
  | FileElement
  | VideoElement;
type CustomElementType = CustomElement['type'];

export type CustomText = {
  id: string;
  type?: string;
  text: string;
  bold?: true;
  italic?: true;
  underlined?: true;
  stroke?: true;
  color?: string;
  bg?: string;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
