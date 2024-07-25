import { ReactNode } from 'react';

import { RenderElementProps } from 'slate-react';

import { type CustomElement, type CustomText } from '../slate';

import { Typography } from './Typography';
import { BulletedList } from './BulletedList';
import { NumberedList } from './NumberedList';
import { ListItem } from './ListItem';
import { Quote } from './Quote';
import { QuoteText } from './QuoteText';
import { QuoteAuthor } from './QuoteAuthor';
import { Tip } from './Tip';
import { Icon } from './Icon';
import { ImageBlock } from './ImageBlock';
import { FileBlock } from './FileBlock';
import { VideoBlock } from './VideoBlock';
import { Divider } from './Divider';
import { Image } from './Image';
import { File } from './File';
import { Video } from './Video';
import { Code } from './Code';
import { Link } from './Link';

export type CustomRenderElementProps = RenderElementProps & {
  element: {
    type: string;
    children?: (CustomText | CustomElement)[];
    icon?: ReactNode;
    url?: string;
    fileName?: string;
    size?: number;
    color?: string;
    bg?: string;
  };
};

export const RenderElement = ({ element, attributes, children }: CustomRenderElementProps) => {
  switch (element.type) {
    case 'paragraph':
    case 'heading1':
    case 'heading2':
    case 'heading3':
      return (
        <Typography element={element} attributes={attributes}>
          {children}
        </Typography>
      );
    case 'bulleted-list':
      return (
        <BulletedList element={element} attributes={attributes}>
          {children}
        </BulletedList>
      );
    case 'numbered-list':
      return (
        <NumberedList element={element} attributes={attributes}>
          {children}
        </NumberedList>
      );
    case 'list-item':
      return <ListItem attributes={attributes}>{children}</ListItem>;
    case 'quote':
      return (
        <Quote element={element} attributes={attributes}>
          {children}
        </Quote>
      );
    case 'quoteText':
      return (
        <QuoteText element={element} attributes={attributes}>
          {children}
        </QuoteText>
      );
    case 'quoteAuthor':
      return (
        <QuoteAuthor element={element} attributes={attributes}>
          {children}
        </QuoteAuthor>
      );
    case 'tip':
      return (
        <Tip element={element} attributes={attributes}>
          {children}
        </Tip>
      );
    case 'icon':
      return (
        <Icon element={element} attributes={attributes}>
          {children}
        </Icon>
      );
    case 'imageBlock':
      return (
        <ImageBlock element={element} attributes={attributes}>
          {children}
        </ImageBlock>
      );
    case 'fileBlock':
      return (
        <FileBlock element={element} />
      );
    case 'videoBlock':
      return (
        <VideoBlock element={element} />
      );
    case 'divider':
      return (
        <Divider attributes={attributes}>
          {children}
        </Divider>
      );
    case 'image':
      return (
        <Image element={element} attributes={attributes}>
          {children}
        </Image>
      );
    case 'file':
      return (
        <File element={element} attributes={attributes}>
          {children}
        </File>
      );
    case 'video':
      return (
        <Video element={element} attributes={attributes}>
          {children}
        </Video>
      );
    case 'code':
      return (
        <Code element={element} attributes={attributes}>
          {children}
        </Code>
      );
    case 'link':
      return (
        <Link element={element} attributes={attributes}>
          {children}
        </Link>
      );

    default:
      console.warn('Unknown element type', element);
      return null;
  }
};
