import { Editor } from 'slate';

export const isFormatActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => (n as any)?.[format] === true,
    mode: 'all',
  });
  return !!match;
};
