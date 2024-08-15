import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import rootElements from '../const/rootElements';
import { useInterfaceStore } from '../interfaceStore';
import { createDefaultNode } from '../utils/createDefaultNode';
import { type CustomElement } from '../slate';

type AddNewNodePropsT = {
  children: ReactNode
  element: CustomElement;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddNewNode = ({ children, element, isOpen, setIsOpen }: AddNewNodePropsT) => {
  const editor = useSlate();

  const handleDropdownSelect = (type: string) => {
    const currentElIndex = editor.children.findIndex((item) => item.id === element.id);

    if (currentElIndex === -1) return;

    Transforms.insertNodes(editor, createDefaultNode(type), {
      at: [currentElIndex + 1],
    });
  };

  const isAddNewNode = useInterfaceStore((state) => state.isAddNewNode);

  if (isAddNewNode === element?.id) console.log('isAddNewNode', isOpen, isAddNewNode, element);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" alignOffset={-12}>
        {(
          Object.entries(rootElements)
        ).map(([type, opt]) => (
          <DropdownMenuItem
            className="gap-2 hover:bg-gray-5 rounded"
            key={type}
            onSelect={() => handleDropdownSelect(type)}
          >
            <opt.icon />
            <span className="text-sm">{opt.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
