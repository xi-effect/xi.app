/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@xipkg/popover';

import { ReactEditor, useSlate } from 'slate-react';
import { Transforms } from 'slate';
import { AddFilePopover } from 'pkg.popover.add-file';
import { Video as IconVideo } from '@xipkg/icons';
import { CustomEditor } from '@xipkg/slatetypes';
import { type CustomRenderElementProps } from './RenderElement';
import { createDefaultNode } from '../utils/createDefaultNode';

type VideoPropsT = CustomRenderElementProps;

export const Video = ({ element, children, attributes }: VideoPropsT) => {
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
              <IconVideo className="fill-brand-80 h-10 w-9" />
              <p className="text-gray-80 ml-2 text-sm" contentEditable={false}>
                Выберите видео
              </p>
              {children}
            </div>
          </PopoverTrigger>
          <PopoverContent className="border-gray-10 w-fit rounded-3xl border p-4">
            <AddFilePopover
              createDefaultNode={createDefaultNode}
              setOpen={setOpen}
              handleFileAttached={handleFileAttached}
              type="video"
              editor={editor as CustomEditor}
              acceptedExtensions="video/*"
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};
