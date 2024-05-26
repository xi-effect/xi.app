import { makeNodeId } from '../plugins/withNodeId';
import { type CustomElement } from '../slate';

export default [
  {
    id: makeNodeId(),
    type: 'paragraph',
    children: [
      {
        text: '0. Perfect unison',
        id: makeNodeId(),
      },
    ],
  },
  {
    id: makeNodeId(),
    type: 'paragraph',
    children: [
      {
        text: 'Major sixth',
        id: makeNodeId(),
      },
    ],
  },
] satisfies CustomElement[];
