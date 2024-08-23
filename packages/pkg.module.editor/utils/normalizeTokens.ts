/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import Prism from 'prismjs';

type PrismToken = Prism.Token;
type Token = {
  types: string[];
  content: string;
  empty?: boolean;
};

// const normalizeEmptyLines = (line: Token[]) => {
//   if (line.length === 0) {
//     line.push({
//       types: ['plain'],
//       content: '\n',
//       empty: true,
//     });
//   } else if (line.length === 1 && line[0].content === '') {
//     line[0].content = '\n';
//     line[0].empty = true;
//   }
// };

const appendTypes = (types: string[], add: string[] | string): string[] => {
  const typesSize = types.length;
  if (typesSize > 0 && types[typesSize - 1] === add) {
    return types;
  }

  return types.concat(add);
};

export const normalizeTokens = (tokens: Array<PrismToken | string>): Token[][] => {
  const typeArrStack: string[][] = [[]];
  const tokenArrStack = [tokens];
  const tokenArrIndexStack = [0];
  const tokenArrSizeStack = [tokens.length];

  let i = 0;
  let stackIndex = 0;
  const currentLine: { types: string[]; content: string }[] = [];

  const acc = [currentLine];

  while (stackIndex > -1) {
    while ((i = tokenArrIndexStack[stackIndex]++) < tokenArrSizeStack[stackIndex]) {
      let content;
      let types = typeArrStack[stackIndex];

      const tokenArr = tokenArrStack[stackIndex];
      const token = tokenArr[i];

      if (typeof token === 'string') {
        types = stackIndex > 0 ? types : ['plain'];
        content = token;
      } else {
        types = appendTypes(types, token.type);
        if (token.alias) {
          types = appendTypes(types, token.alias);
        }
        content = token.content;
      }

      if (typeof content !== 'string') {
        stackIndex++;
        typeArrStack.push(types);
        tokenArrStack.push(content);
        tokenArrIndexStack.push(0);
        tokenArrSizeStack.push(content.length);
        continue;
      }

      currentLine.push({ types, content });
    }

    stackIndex--;
    typeArrStack.pop();
    tokenArrStack.pop();
    tokenArrIndexStack.pop();
    tokenArrSizeStack.pop();
  }

  return acc;
};