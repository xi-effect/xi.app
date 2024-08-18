import React, { useCallback, useEffect, useState } from 'react';
import { Slate, Editable, RenderElementProps } from 'slate-react';
import { Move, Plus } from '@xipkg/icons';
import { Descendant } from 'slate';
import { useEditor } from '../Editor';
import { RenderElement } from '../elements/RenderElement';

const DragOverlayContent = ({ element }: { element: Descendant }) => {
    const editor = useEditor();
    const [value] = useState([JSON.parse(JSON.stringify(element))]); // clone

    useEffect(() => {
        document.body.classList.add('dragging');

        return () => document.body.classList.remove('dragging');
    }, []);

    const renderElement = useCallback((props: RenderElementProps) =>
        (<RenderElement {...props} />), []);

    return (
      <div className="group/node flex">
        <div className="flex absolute items-end transition *:size-5 *:flex *:items-center *:justify-center *:bg-transparent gap-2 h-[25px] w-[48px] group-hover/node:flex">
          <button className="hover:bg-gray-5 active:bg-gray-5 rounded" aria-label="plus" type="button">
            <Plus />
          </button>
          <button className="hover:bg-gray-5 active:bg-gray-5 rounded cursor-grabbing" aria-label="move" type="button">
            <Move />
          </button>
        </div>
        <Slate editor={editor} initialValue={value}>
          <Editable className="ml-14 w-full" readOnly renderElement={renderElement} />
        </Slate>
      </div>
    );
};

export default DragOverlayContent;
