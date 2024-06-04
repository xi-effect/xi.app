import { makeNodeId } from '../plugins/withNodeId';
import { type CustomElement, type CustomText, type CustomElementType } from '../slate';

const createNode = <T extends CustomElementType>(
  {
    type,
    ...rest
  }: Extract<CustomElement, { type: T }> extends never
    ? { type: T }
    : Omit<Extract<CustomElement, { type: T }>, 'id' | 'children'>,
  ...children: Array<CustomElement | CustomText>
) => ({
  id: makeNodeId(),
  type,
  children,
  ...rest,
});

export default createNode;
