import { LANGUAGES } from '../const/codeEditorLanguages';
import { type CustomEditor } from '../slate';

export type NormalizeNodeFn = (
  ...args: [CustomEditor, ...Parameters<CustomEditor['normalizeNode']>]
) => void;

export type LanguageKey = keyof typeof LANGUAGES;
