/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import Prism from 'prismjs';
import { useCallback } from 'react';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-java';
import { NodeEntry, Node, Range } from 'slate';
import { normalizeTokens } from '../utils/normalizeTokens';
import { CodeElement } from '../slate';
import { DEFAULT_LANGUAGE } from '../const/codeEditorLanguages';

export const useDecorateCode = () =>
  useCallback(([node, blockPath]: NodeEntry<CodeElement>) => {
    const ranges: Range[] = [];

    if (node.type === 'code' && node.children && node.children.length > 0) {
      const editorCode = node.children.map((line) => Node.string(line)).join('\n');

      const language = Prism.languages[node.language || DEFAULT_LANGUAGE || ''];

      const codeTokens = Prism.tokenize(editorCode, language);
      const normalizedTokens = normalizeTokens(codeTokens);

      for (let index = 0; index < normalizedTokens.length; index++) {
        const tokens = normalizedTokens[index];

        let start = 0;
        for (const token of tokens) {
          const { length } = token.content;
          if (!length) {
            continue;
          }

          const end = start + length;

          const path = [...blockPath, index, 0];
          ranges.push({
            anchor: { path, offset: start },
            focus: { path, offset: end },
            token: token.types.join(' '),
          });

          start = end;
        }
      }
    }

    return ranges;
  }, []);
