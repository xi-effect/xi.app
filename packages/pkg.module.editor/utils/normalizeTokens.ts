import Prism from 'prismjs';

type PrismTokenT = Prism.Token;
type TokenT = {
  types: string[];
  content: string;
  empty?: boolean;
};

const appendTypes = (types: string[], add: string[] | string): string[] => {
  const typesSize = types.length;
  if (typesSize > 0 && types[typesSize - 1] === add) {
    return types;
  }

  return types.concat(add);
};

export const normalizeTokens = (tokens: Array<PrismTokenT | string>): TokenT[][] => {
  const typeArrStack: string[][] = [[]];
  const tokenArrStack: Array<(PrismTokenT | string)[]> = [tokens];
  const tokenArrIndexStack: number[] = [0];
  const tokenArrSizeStack: number[] = [tokens.length];

  let stackIndex = 0;
  const acc: TokenT[][] = [[]];

  while (stackIndex >= 0) {
    const currentLine: TokenT[] = acc[acc.length - 1];
    const tokenArr = tokenArrStack[stackIndex];
    const types = typeArrStack[stackIndex];

    for (let i = tokenArrIndexStack[stackIndex]; i < tokenArrSizeStack[stackIndex]; i += 1) {
      tokenArrIndexStack[stackIndex] = i + 1;

      let content;
      let currentTypes = types;

      const token = tokenArr[i];

      if (typeof token === 'string') {
        currentTypes = stackIndex > 0 ? currentTypes : ['plain'];
        content = token;
      } else {
        currentTypes = appendTypes(currentTypes, token.type);
        if (token.alias) {
          currentTypes = appendTypes(currentTypes, token.alias);
        }
        content = token.content;
      }

      if (typeof content !== 'string') {
        stackIndex += 1;
        typeArrStack.push(currentTypes);
        tokenArrStack.push(content as Array<PrismTokenT | string>);
        tokenArrIndexStack.push(0);
        tokenArrSizeStack.push(content.length);
        break;
      }

      currentLine.push({ types: currentTypes, content });
    }

    if (tokenArrIndexStack[stackIndex] >= tokenArrSizeStack[stackIndex]) {
      stackIndex -= 1;
      typeArrStack.pop();
      tokenArrStack.pop();
      tokenArrIndexStack.pop();
      tokenArrSizeStack.pop();
    }
  }

  return acc;
};
