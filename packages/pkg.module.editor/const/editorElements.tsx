import { H1, H2, H3, IconProps, Text } from '@xipkg/icons';
import { ComponentType } from 'react';
import { type RenderElementProps } from 'slate-react';

export type EditorElementType = keyof typeof options;

export type EditorElementOptions = {
  // eslint-disable-next-line no-undef
  render: (props: RenderElementProps) => JSX.Element;
  label: string;
  icon: ComponentType<IconProps>;
};

export const options = {
  paragraph: {
    label: 'Текст',
    render: (p) => (
      <div className="text-xl" {...p.attributes}>
        {p.children}
      </div>
    ),
    icon: Text,
  },
  heading1: {
    label: 'Заголовок 1',
    render: (p) => (
      <div className="text-4xl" {...p.attributes}>
        {p.children}
      </div>
    ),
    icon: H1,
  },
  heading2: {
    label: 'Заголовок 2',
    render: (p) => (
      <div className="text-3xl" {...p.attributes}>
        {p.children}
      </div>
    ),
    icon: H2,
  },
  heading3: {
    label: 'Заголовок 3',
    render: (p) => (
      <div className="text-2xl" {...p.attributes}>
        {p.children}
      </div>
    ),
    icon: H3,
  },
} as const satisfies Record<any, EditorElementOptions>;

export default options;
