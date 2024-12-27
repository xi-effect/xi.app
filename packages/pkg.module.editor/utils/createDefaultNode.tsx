import { defaultLanguage } from '../const/codeEditorLanguages';
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
        // @ts-expect-error TODO: разобраться с типизацией
        children: [{ type: 'icon', icon: '🚧' }, { type: 'heading3' }, { type: 'paragraph' }],
      });

    case 'imageBlock':
      // @ts-expect-error TODO: разобраться с типизацией
      return node({ type: 'imageBlock', url: url ?? '', children: [{ text: '' }] });

    case 'fileBlock':
      return node({
        type: 'fileBlock',
        // @ts-expect-error TODO: разобраться с типизацией
        fileName: fileName ?? '',
        url: url ?? '',
        size: size ?? 0,
        children: [{ text: '' }],
      });

    case 'videoBlock':
      // @ts-expect-error TODO: разобраться с типизацией
      return node({ type: 'videoBlock', url: url ?? '', children: [{ text: '' }] });
    case 'code':
      // @ts-expect-error TODO: разобраться с типизацией
      return node({ type: 'code', language: defaultLanguage });

    default:
      // @ts-expect-error TODO: разобраться с типизацией
      return node({ type });
  }
};
