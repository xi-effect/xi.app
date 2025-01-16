import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

export type CamelToSnakeCase<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Tail extends Uncapitalize<Tail>
    ? `${Lowercase<Head>}${CamelToSnakeCase<Tail>}`
    : `${Lowercase<Head>}_${CamelToSnakeCase<Uncapitalize<Tail>>}`
  : S;

export type CustomEditorSI = BaseEditor &
  ReactEditor & {
    resetContent: () => void;
    setContent: (nodes: Descendant[]) => void;
    focus: () => void;
  };
