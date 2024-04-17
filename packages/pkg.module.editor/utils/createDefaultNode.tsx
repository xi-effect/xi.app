import { type CommonCustomElementType } from '../slate';
import node from './createNode';

export const createDefaultNode = (type: CommonCustomElementType) => {
  switch (type) {
    case 'bulleted-list':
      return node({ type }, node({ type: 'list-item' }));
    case 'numbered-list':
      return node({ type }, node({ type: 'list-item' }));
    case 'quote':
      return node({ type }, node({ type: 'heading3' }), node({ type: 'paragraph' }));
    case 'tip':
      return node(
        { type },
        node({ type: 'heading3' }, node({ type: 'icon', icon: '🚧' })),
        node({ type: 'paragraph' }),
      );
    default:
      return node({ type });
  }
};

export default createDefaultNode;
