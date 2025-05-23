/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import { ArrowBottom, ArrowUp, Copy, Trash } from '@xipkg/icons';
import { type CustomElement } from '@xipkg/slatetypes';
import { assignIdRecursively } from '../plugins/withNodeId';

type ElementControlsModalPropsT = {
  children: ReactNode;
  element: CustomElement;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ElementControlsModal = ({
  children,
  element,
  isOpen,
  setIsOpen,
}: ElementControlsModalPropsT) => {
  const editor = useSlate();

  // @ts-ignore
  const currentElIndex = editor.children.findIndex((item) => item.id === element.id);

  const handleMoveUp = () => {
    if (editor.children.length > 2 && currentElIndex > 0) {
      Transforms.moveNodes(editor, {
        at: [currentElIndex],
        to: [currentElIndex - 1],
      });
    }
  };

  const handleMoveDown = () => {
    if (editor.children.length > 2 && currentElIndex < editor.children.length - 2) {
      Transforms.moveNodes(editor, {
        at: [currentElIndex],
        to: [currentElIndex + 1],
      });
    }
  };

  const handleDuplicate = () => {
    const newElement = JSON.parse(JSON.stringify(element));
    assignIdRecursively(newElement);
    Transforms.insertNodes(editor, newElement, {
      at: [currentElIndex],
    });
  };

  const handleDelete = () => {
    Transforms.delete(editor, {
      at: [currentElIndex],
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DropdownMenuTrigger />
      <DropdownMenuContent side="left" align="center" sideOffset={32}>
        <DropdownMenuItem
          disabled={currentElIndex === 0}
          className="hover:bg-gray-5 rounded"
          onSelect={handleMoveUp}
        >
          <ArrowUp className="mr-2 h-4 w-4" />
          <span className="text-sm">Выше</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={currentElIndex === editor.children.length - 1}
          className="hover:bg-gray-5 rounded"
          onSelect={handleMoveDown}
        >
          <ArrowBottom className="mr-2 h-4 w-4" />
          <span className="text-sm">Ниже</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-5 rounded" onSelect={handleDuplicate}>
          <Copy className="mr-2 h-4 w-4" />
          <span className="text-sm">Дублировать</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-5 rounded" onSelect={handleDelete}>
          <Trash className="mr-2 h-4 w-4" />
          <span className="text-sm">Удалить</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
