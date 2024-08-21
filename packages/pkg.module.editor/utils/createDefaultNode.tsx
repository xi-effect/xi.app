import { DEFAULT_LANGUAGE } from '../const/codeEditorLanguages';
import node from './createNode';
// import { type CustomElementType } from '../slate';

export const createDefaultNode = (type: string, url?: string, fileName?: string, size?: number) => {
  switch (type) {
    case 'bulleted-list':
      return node({ type }, node({ type: 'list-item' }));

    case 'numbered-list':
      return node({ type }, node({ type: 'list-item' }));

    case 'quote':
      return node({ type }, node({ type: 'quoteText' }), node({ type: 'quoteAuthor' }));

    case 'tip':
      return node({
        type,
        // @ts-ignore
        children: [{ type: 'icon', icon: '🚧' }, { type: 'heading3' }, { type: 'paragraph' }],
      });

    case 'imageBlock':
      // @ts-ignore
      return node({ type: 'imageBlock', url: url ?? '', children: [{ text: '' }] });

    case 'fileBlock':
      return node({
        type: 'fileBlock',
        // @ts-ignore
        fileName: fileName ?? '',
        url: url ?? '',
        size: size ?? 0,
        children: [{ text: '' }],
      });

    case 'videoBlock':
      // @ts-ignore
      return node({ type: 'videoBlock', url: url ?? '', children: [{ text: '' }] });
    case 'code':
      // @ts-ignore
      return node({ type: 'code', language: DEFAULT_LANGUAGE });

    default:
      // @ts-ignore
      return node({ type });
  }
};
