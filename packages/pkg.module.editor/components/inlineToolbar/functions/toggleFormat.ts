import { Editor } from 'slate';
import { isFormatActive } from './isFormatActive';

export const toggleFormat = (editor: Editor, format: string) => {
  const isActive = isFormatActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
