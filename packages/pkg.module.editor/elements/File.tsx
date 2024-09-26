/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@xipkg/popover';

import { ReactEditor, useSlate } from 'slate-react';
import { Transforms } from 'slate';
import { AddFilePopover } from 'pkg.popover.add-file';
import { File as IconFile } from '@xipkg/icons';
import { type CustomRenderElementProps } from './RenderElement';
import { createDefaultNode } from '../utils/createDefaultNode';

type FilePropsT = CustomRenderElementProps;

export const File = ({ element, children, attributes }: FilePropsT) => {
  const [open, setOpen] = useState(false);

  const [fileAttached, setFileAttached] = useState(false);
  const editor = useSlate();

  const handleFileAttached = () => {
    setFileAttached(true);
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, { at: path });
  };

  return (
    <>
      {!fileAttached && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div
              className="border-gray-10 flex w-full cursor-pointer items-center rounded-lg border p-3"
              onClick={(prev) => setOpen(!prev)}
              onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
              role="button"
              tabIndex={0}
              {...attributes}
            >
              <IconFile className="fill-brand-80 h-10 w-9" />
              <p className="text-gray-80 ml-2 text-sm" contentEditable={false}>
                Выберите файл
              </p>
              {children}
            </div>
          </PopoverTrigger>
          <PopoverContent className="border-gray-10 w-fit rounded-3xl border p-4">
            <AddFilePopover
              createDefaultNode={createDefaultNode}
              setOpen={setOpen}
              handleFileAttached={handleFileAttached}
              type="file"
              editor={editor}
              acceptedExtensions="application/*"
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};
