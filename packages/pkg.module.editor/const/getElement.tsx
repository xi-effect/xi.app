import { type CustomText, type CustomElement } from '../slate';
import { makeNodeId } from '../plugins/withNodeId';
import { type EditorElementType } from './editorElements';

type CreateFn = (children?: Array<CustomElement | CustomText>) => CustomElement;

const listItem: CreateFn = (child = []) => ({
  id: makeNodeId(),
  type: 'list-item',
  children: [{ id: makeNodeId(), text: '' }, ...child],
});

const bulletedList: CreateFn = (child = []) => ({
  id: makeNodeId(),
  type: 'bulleted-list',
  children: [listItem([{ id: makeNodeId(), text: '' }]), ...child],
});

const numberedList: CreateFn = (child = []) => ({
  id: makeNodeId(),
  type: 'numbered-list',
  children: [listItem([{ id: makeNodeId(), text: '' }]), ...child],
});

const elements: Partial<Record<EditorElementType, CreateFn>> = {
  'list-item': listItem,
  'bulleted-list': bulletedList,
  'numbered-list': numberedList,
};

export default elements;
