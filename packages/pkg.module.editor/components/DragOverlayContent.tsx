/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { useCallback, useEffect, useState } from 'react';
import { Editable, RenderElementProps, Slate } from 'slate-react';
import { Move, Plus } from '@xipkg/icons';
import { createEditor, Descendant } from 'slate';
import { RenderElement } from '../elements/RenderElement';
import { useDecorateCode } from '../hooks/useDecorateCode';
import { Leaf } from './Leaf';

const DragOverlayContent = ({ element }: { element: Descendant }) => {
  const newEditor = createEditor();

  const [value] = useState([JSON.parse(JSON.stringify(element))]); // clone
  const decorateCode = useDecorateCode();

  useEffect(() => {
    document.body.classList.add('dragging');

    return () => document.body.classList.remove('dragging');
  }, []);

  const renderElement = useCallback(
    (props: RenderElementProps) => <RenderElement {...props} />,
    [],
  );

  return (
    <div className="group/node flex">
      <div className="absolute flex h-[25px] w-[48px] items-end gap-2 transition *:flex *:size-5 *:items-center *:justify-center *:bg-transparent group-hover/node:flex">
        <button
          className="hover:bg-gray-5 active:bg-gray-5 rounded"
          aria-label="plus"
          type="button"
        >
          <Plus />
        </button>
        <button
          className="hover:bg-gray-5 active:bg-gray-5 cursor-grabbing rounded"
          aria-label="move"
          type="button"
        >
          <Move />
        </button>
      </div>
      <Slate editor={newEditor} initialValue={value}>
        <Editable
          className="ml-14 w-full"
          readOnly
          renderElement={renderElement}
          renderLeaf={(props) => <Leaf {...props} />}
          // @ts-ignore
          decorate={decorateCode}
        />
      </Slate>
    </div>
  );
};

export default DragOverlayContent;
