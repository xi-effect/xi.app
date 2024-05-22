import { type CustomEditor } from '../slate';

export type NormalizeNodeFn = (
  ...args: [CustomEditor, ...Parameters<CustomEditor['normalizeNode']>]
) => void;
