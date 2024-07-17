import {
  Cite,
  H1,
  H2,
  H3,
  IconProps,
  Objects,
  Ol,
  Text,
  Ul,
  File,
  Photo,
  Video,
  Code,
} from '@xipkg/icons';
import { ComponentType } from 'react';
import { type CustomElement } from '../slate';

export type EditorRootElementOptions = {
  // eslint-disable-next-line no-undef
  label: string;
  icon: ComponentType<IconProps>;
};
export default {
  paragraph: {
    label: 'Текст',
    icon: Text,
  },
  heading1: {
    label: 'Заголовок 1',
    icon: H1,
  },
  heading2: {
    label: 'Заголовок 2',
    icon: H2,
  },
  heading3: {
    label: 'Заголовок 3',
    icon: H3,
  },
  'bulleted-list': {
    label: 'Маркированный список',
    icon: Ul,
  },
  'numbered-list': {
    label: 'Нумерованный список',
    icon: Ol,
  },
  quote: {
    label: 'Цитата',
    icon: Cite,
  },
  tip: {
    label: 'Совет',
    icon: Objects,
  },
  divider: {
    label: 'Разделитель',
    icon: Ul,
  },
  image: {
    label: 'Изображение',
    icon: Photo,
  },
  file: {
    label: 'Файл',
    icon: File,
  },
  video: {
    label: 'Видео',
    icon: Video,
  },
  code: {
    label: 'Код',
    icon: Code,
  },
} as const satisfies Partial<Record<CustomElement, EditorRootElementOptions>>;
