import { type CustomEditor } from '@xipkg/slatetypes';
import { languages } from '../const/codeEditorLanguages';

export type NormalizeNodeFn = (
  ...args: [CustomEditor, ...Parameters<CustomEditor['normalizeNode']>]
) => void;

export type LanguageKey = keyof typeof languages;
