import { makeNodeId } from '../plugins/withNodeId';
import { type CustomElement, type CustomText, type CustomElementType } from '../slate';

type CreateNodeOptions<T extends CustomElementType> =
  Extract<CustomElement, { type: T }> extends never
    ? { type: T }
    : Omit<Extract<CustomElement, { type: T }>, 'id' | 'children'> & { type: T };

const createNode = <T extends CustomElementType>(
  options: CreateNodeOptions<T>,
  ...children: Array<CustomElement | CustomText>
): CustomElement => ({
  id: makeNodeId(),
  children,
  ...options,
});

export default createNode;
