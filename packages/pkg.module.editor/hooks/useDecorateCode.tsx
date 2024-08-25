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
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-objectivec';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';

import { NodeEntry, Node, Range } from 'slate';
import { normalizeTokens } from '../utils/normalizeTokens';
import { CodeElement } from '../slate';
import { defaultLanguage } from '../const/codeEditorLanguages';

export const useDecorateCode = () =>
  useCallback(([node, blockPath]: NodeEntry<CodeElement>) => {
    const ranges: Range[] = [];

    if (node.type === 'code' && node.children && node.children.length > 0) {
      const editorCode = node.children.map((line) => Node.string(line)).join('\n');

      const language = Prism.languages[node.language || defaultLanguage || ''];
      const codeTokens = Prism.tokenize(editorCode, language);
      const normalizedTokens = normalizeTokens(codeTokens);

      for (let index = 0; index < normalizedTokens.length; index += 1) {
        const tokens = normalizedTokens[index];
        let start = 0;
        for (const token of tokens) {
          const { length } = token.content;
          const end = start + length;

          if (typeof token !== 'string') {
            ranges.push({
              anchor: { path: blockPath, offset: start },
              focus: { path: blockPath, offset: end },
              token: token.types.join(' '),
            });
          }

          start = end;
        }
      }
    }

    return ranges;
  }, []);
