/* eslint-disable no-useless-return */
import React from 'react';
import { FloatingFocusManager, UseFloatingReturn } from '@floating-ui/react';
import rootElements, { EditorRootElementOptions } from '../const/rootElements';
import { CommonCustomElementType, type CustomElementType } from '../slate';
// import { useInterfaceStore } from '../interfaceStore';

type AddNewNodePropsT = {
  floating: UseFloatingReturn;
};

export const AddNewNode = ({ floating }: AddNewNodePropsT) => {
  const handleDropdownSelect = (type: string) => { console.log('type', type); };

  return (
    <FloatingFocusManager context={floating?.context} modal={false}>
      <div
        ref={floating.refs.setFloating}
        style={{
          position: floating?.strategy,
          top: floating?.y ?? 0,
          left: floating?.x ?? 0,
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
