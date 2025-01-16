/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Transforms, Editor } from 'slate';

export const codeEditorInsertText = (
  editor: Editor,
  event: React.KeyboardEvent<HTMLDivElement>,
  text: string,
) => {
  const { selection } = editor;

  if (selection) {
    const [parentNode] = Editor.parent(editor, selection);

    // @ts-ignore
    if (parentNode && parentNode.type === 'code') {
      event.preventDefault();
      Transforms.insertText(editor, text);
    }
  }
};
