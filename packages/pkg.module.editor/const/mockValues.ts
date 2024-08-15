import { makeNodeId } from '../plugins/withNodeId';
import { type CustomElement } from '../slate';

export const mockValues = [
  {
    id: makeNodeId(),
    type: 'paragraph',
    children: [
      {
        text: 'Простой текст',
        id: makeNodeId(),
      },
    ],
  },
  {
    id: makeNodeId(),
    type: 'heading1',
    children: [
      {
        text: 'Заголовок 1',
        id: makeNodeId(),
      },
    ],
  },
  {
    id: makeNodeId(),
    type: 'heading2',
    children: [
      {
        text: 'Заголовок 2',
        id: makeNodeId(),
      },
    ],
  },
  {
    id: makeNodeId(),
    type: 'heading3',
    children: [
      {
        text: 'Заголовок 3',
        id: makeNodeId(),
      },
    ],
  },
  {
    id: makeNodeId(),
    type: 'numbered-list',
    children: [
      {
        type: 'list-item',
        id: makeNodeId(),
        children: [
          {
            text: 'Нумерованный список 1',
            id: makeNodeId(),
          },
        ],
      },
      {
        type: 'list-item',
        id: makeNodeId(),
        children: [
          {
            text: 'Нумерованный список 1',
            id: makeNodeId(),
          },
        ],
      },
    ],
  },
  {
    id: makeNodeId(),
    type: 'bulleted-list',
    children: [
      {
        type: 'list-item',
        id: makeNodeId(),
        children: [
          {
            text: 'Нумерованный список 1',
            id: makeNodeId(),
          },
        ],
      },
      {
        type: 'list-item',
        id: makeNodeId(),
        children: [
          {
            text: 'Нумерованный список 1',
            id: makeNodeId(),
          },
        ],
      },
    ],
  },

  // {
  //   id: makeNodeId(),
  //   type: 'quote',
  //   children: [
  //     {
  //       id: makeNodeId(),
  //       type: 'quoteText',
  //       children: [
  //         {
  //           text: 'The only limit to our realization of tomorrow is our doubts of today.',
  //           id: makeNodeId(),
  //         },
  //       ],
  //     },
  //     {
  //       id: makeNodeId(),
  //       type: 'quoteAuthor',
  //       children: [
  //         {
  //           text: 'Franklin D. Roosevelt',
  //           id: makeNodeId(),
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: makeNodeId(),
  //   type: 'tip',
  //   children: [
  //     {
  //       id: makeNodeId(),
  //       type: 'quoteText',
  //       children: [
  //         {
  //           id: makeNodeId(),
  //           type: 'icon',
  //           children: [
  //             {
  //               text: 'Wash your hands',
  //               id: makeNodeId(),
  //             },
  //           ],
  //           icon: '🚧',
  //         },
  //       ],
  //     },
  //     {
  //       id: makeNodeId(),
  //       type: 'quoteAuthor',
  //       children: [
  //         {
  //           text: 'Wash your hands',
  //           id: makeNodeId(),
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    id: makeNodeId(),
    type: 'divider',
    children: [
      {
        text: '',
        id: makeNodeId(),
      },
    ],
  },
  // {
  //   id: makeNodeId(),
  //   type: 'image',
  //   children: [
  //     {
  //       text: '',
  //       id: makeNodeId(),
  //     },
  //   ],
  // },
  // {
  //   id: makeNodeId(),
  //   type: 'file',
  //   children: [
  //     {
  //       text: '',
  //       id: makeNodeId(),
  //     },
  //   ],
  // },
  // {
  //   id: makeNodeId(),
  //   type: 'video',
  //   children: [
  //     {
  //       text: '',
  //       id: makeNodeId(),
  //     },
  //   ],
  // },
  // {
  //   id: makeNodeId(),
  //   type: 'code',
  //   children: [
  //     {
  //       text: '',
  //       id: makeNodeId(),
  //     },
  //   ],
  // },
] satisfies CustomElement[];
