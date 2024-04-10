import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { type EditorElementType } from './const/editorElements';

type CustomText = { id: string; text: string; bold?: true };
type CustomElement = {
  type: EditorElementType;
  children: Array<CustomText | CustomElement>;
  id: string;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & { id: string };
    Element: CustomElement;
    Text: CustomText;
  }
}
