// import { type CommonCustomElementType } from '../slate';
import node from './createNode';

export const createDefaultNode = (type: string, url?: string, fileName?: string, size?: number) => {
  switch (type) {
    case 'bulleted-list':
      return node({ type }, node({ type: 'list-item' }));

    case 'numbered-list':
      return node({ type }, node({ type: 'list-item' }));

    case 'quote':
      return node({ type }, node({ type: 'quoteText' }), node({ type: 'quoteAuthor' }));

    case 'tip':
      return node(
        { type },
        node({ type: 'heading3' }, node({ type: 'icon', icon: '🚧' })),
        node({ type: 'paragraph' }),
      );

    case 'imageBlock':
      return node({ type: 'imageBlock', url: url ?? '', children: [{ text: '' }] });

    case 'fileBlock':
      return node({
        type: 'fileBlock',
        fileName: fileName ?? '',
        url: url ?? '',
        size: size ?? 0,
        children: [{ text: '' }],
      });

    case 'videoBlock':
      return node({ type: 'videoBlock', url: url ?? '', children: [{ text: '' }] });

    case 'code':
      return node({ type: 'code' });

    default:
      return node({ type });
  }
};
