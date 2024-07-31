import React, { ComponentProps, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { Close, Move, Plus } from '@xipkg/icons';
import { type CustomElement } from '../slate';
import { AddNewNode } from './AddNewNode';

type PortalProps = {
  children: ReactNode;
};

export const Portal = ({ children }: PortalProps) =>
  typeof document === 'object' ? ReactDOM.createPortal(children, document.body) : null;

export const CellControls = ({
  moveProps,
  element,
}: Partial<Record<'moveProps', ComponentProps<'button'>> & { element: CustomElement }>) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleNewNode = () => {
    setIsOpen((prev) => !prev);
  };

  if (!element) return null;

  return (
    <div className={`absolute ${isOpen ? 'opacity-100' : ''} flex items-end opacity-0 transition *:size-5 *:flex *:items-center *:justify-center *:bg-transparent gap-2 h-[25px] w-[48px] group-hover/node:opacity-100`}>
      <AddNewNode element={element} isOpen={isOpen} setIsOpen={setIsOpen}>
        <button className="hover:bg-gray-5 active:bg-gray-5 rounded" onClick={handleNewNode} type="button">
          {isOpen ? <Close /> : <Plus />}
        </button>
      </AddNewNode>
      <button
        className="hover:bg-gray-5 active:bg-gray-5 rounded cursor-grab"
        aria-label="move"
        type="button"
        {...moveProps}
        onClick={() => console.log('hi')}
      >
        <Move />
      </button>
    </div>
  );
};
