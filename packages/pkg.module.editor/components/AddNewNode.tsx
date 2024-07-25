/* eslint-disable no-useless-return */
import React, { useEffect, useRef, useState } from 'react';
import { useFloating, offset, autoUpdate, FloatingFocusManager } from '@floating-ui/react';
import rootElements, { EditorRootElementOptions } from '../const/rootElements';
import { CommonCustomElementType, type CustomElementType } from '../slate';
import { useInterfaceStore } from '../interfaceStore';

// type AddNewNodePropsT = {
//   children: ReactNode;
// };

// { children }: AddNewNodePropsT

export const AddNewNode = () => {
  const isAddNewNode = useInterfaceStore((state) => state.isAddNewNode);
  const setIsAddNewNode = useInterfaceStore((state) => state.setIsAddNewNode);
  // const setIsAddNewNode = useInterfaceStore((state) => state.setIsAddNewNode);

  const handleDropdownSelect = (type: string) => { console.log('type', type); };

  // const handleDropdownSelect = (type: CustomElementType) => {
  //   Transforms.insertNodes(editor, createDefaultNode(type), {
  //     at: [editor.children.length],
  //   });
  // };

  // const handleOpenChange = () => {
  //   setOpen(!isOpen);
  // };

  // open={isOpen} onOpenChange={handleOpenChange}

  // console.log('isAddNewNode', isAddNewNode);

  const [referenceRef, setReferenceRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setReferenceRef(document.getElementById(`edtr-sortable-element-${isAddNewNode || ''}`));
  }, []);

  const popoverRef = useRef(null);

  console.log('referenceRef', referenceRef);

  const { x, y, strategy, elements, context } = useFloating({
    open: isAddNewNode !== null,
    onOpenChange: () => setIsAddNewNode(null),
    placement: 'left-start',
    middleware: [offset({
      mainAxis: -182,
    })],
    elements: {
      reference: referenceRef,
      floating: popoverRef.current,
    },
    whileElementsMounted: autoUpdate,
  });

  React.useEffect(() => {
    if (!elements.floating) return;
  }, [elements.floating]);

  console.log('x y', x, y);

  if (isAddNewNode === null || referenceRef === null) return null;

  return (
    <FloatingFocusManager context={context} modal={false}>
      <div
        ref={popoverRef}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          zIndex: 1000,
        }}
        className="w-[216px] p-2 border border-gray-10 rounded-lg bg-gray-0"
      >
        {(
          Object.entries(rootElements) as unknown as Array<
            [CommonCustomElementType, EditorRootElementOptions]
          >
        ).map(([type, opt]) => (
          <div
            className="flex flex-row items-center justify-start gap-2 hover:bg-gray-5 rounded p-1 cursor-pointer"
            key={type as unknown as string}
            onSelect={() => handleDropdownSelect(type as unknown as CustomElementType)}
          >
            <opt.icon className="h-4 w-4" />
            <span className="text-s-base">{opt.label}</span>
          </div>
        ))}
      </div>
    </FloatingFocusManager>
  );
};
