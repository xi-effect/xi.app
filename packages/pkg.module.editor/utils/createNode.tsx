import {
  type CustomElement,
  type CustomText,
  type CommonCustomElementType,
} from '@xipkg/slatetypes';
import { makeNodeId } from '../plugins/withNodeId';

type CreateNodeOptions<T extends CommonCustomElementType['type']> =
  Extract<CustomElement, { type: T }> extends never
    ? { type: T }
    : Omit<Extract<CustomElement, { type: T }>, 'id' | 'children'> & { type: T };

const createNode = <T extends CommonCustomElementType['type']>(
  options: CreateNodeOptions<T>,
  ...children: Array<CustomElement | CustomText>
): CustomElement => ({
  id: makeNodeId(),
  children,
  ...options,
});

export default createNode;
