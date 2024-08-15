import { Element, Transforms } from 'slate';
import createNode from '../utils/createNode';
import { NormalizeNodeFn } from './types';

const fn: NormalizeNodeFn = (editor, [node, path]) => {
  if (Element.isElement(node) && node.type === 'quote') {
    // @ts-ignore
    if (!node.children[0] || node.children[0].type !== 'quoteText') {
      Transforms.insertNodes(editor, createNode({ type: 'quoteText' }), { at: path.concat(0) });
    }

    // @ts-ignore
    if (!node.children[1] || node.children[1].type !== 'quoteAuthor') {
      Transforms.insertNodes(editor, createNode({ type: 'quoteAuthor' }), { at: path.concat(1) });
    }

    if (node.children.length > 2) {
      Transforms.removeNodes(editor, { at: path.concat(2) });
    }
  }
};

export default fn;
