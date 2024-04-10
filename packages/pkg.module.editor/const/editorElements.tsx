import { H1, H2, H3, IconProps, Ol, Text, Ul } from '@xipkg/icons';
import { ComponentType } from 'react';
import { type RenderElementProps } from 'slate-react';
import { makeNodeId } from '../plugins/withNodeId';

export type EditorElementType = keyof typeof renderElement;

export const renderElement = {
  paragraph: (p) => (
    <div className="text-xl" {...p.attributes}>
      {p.children}
    </div>
  ),
  heading1: (p) => (
    <div className="text-4xl" {...p.attributes}>
      {p.children}
    </div>
  ),
  heading2: (p) => (
    <div className="text-3xl" {...p.attributes}>
      {p.children}
    </div>
  ),
  heading3: (p) => (
    <div className="text-2xl" {...p.attributes}>
      {p.children}
    </div>
  ),
  'bulleted-list': (p) => (
    <ul className="list-disc pl-4" {...p.attributes}>
      {p.children}
    </ul>
  ),
  'numbered-list': (p) => (
    <ol className="list-decimal pl-4" {...p.attributes}>
      {p.children}
    </ol>
  ),
  'list-item': (p) => <li {...p.attributes}>{p.children}</li>,
  // eslint-disable-next-line no-undef
} as const satisfies Record<any, (props: RenderElementProps) => JSX.Element>;

export const createDefaultElement = (type: EditorElementType) => [
  { id: makeNodeId(), type, children: [{ text: '', id: makeNodeId() }] },
];

export type EditorRootElementOptions = {
  // eslint-disable-next-line no-undef
  label: string;
  icon: ComponentType<IconProps>;
};
export const rootElementTypes = {
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
} as const satisfies Record<any, EditorRootElementOptions>;
