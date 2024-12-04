import React from 'react';
import { NodeEntry, Range } from 'slate';
import { Editable, RenderLeafProps, RenderElementProps } from 'slate-react';
import { Leaf } from './Leaf';

export type EditableElementPropsT = {
  readOnly?: boolean;
  renderElement: (props: RenderElementProps) => React.JSX.Element;
  decorate?: (entry: NodeEntry) => Range[];
  renderLeaf?: (props: RenderLeafProps) => React.JSX.Element;
  onKeyDown?: React.KeyboardEventHandler;
};

export const EditableElement = ({
  renderElement,
  decorate,
  onKeyDown,
  readOnly,
}: EditableElementPropsT) => (
  <Editable
    readOnly={readOnly || false}
    className="flex flex-col gap-2 p-2 text-gray-100 focus-visible:outline-none focus-visible:[&_*]:outline-none"
    renderElement={renderElement}
    decorate={decorate}
    renderLeaf={(props) => <Leaf {...props} />}
    onKeyDown={onKeyDown}
  />
);
