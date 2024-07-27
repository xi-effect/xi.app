import React, { ComponentProps, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { Close, Move, Plus } from '@xipkg/icons';
import { type CustomElement } from '../slate';

// import { AddNewNode } from './AddNewNode';
import { useInterfaceStore } from '../interfaceStore';

type PortalProps = {
  children: ReactNode;
};

export const Portal = ({ children }: PortalProps) =>
  typeof document === 'object' ? ReactDOM.createPortal(children, document.body) : null;

export const CellControls = ({
  moveProps,
  element,
}: Partial<Record<'moveProps', ComponentProps<'button'>> & { element: CustomElement }>) => {
  const isAddNewNode = useInterfaceStore((state) => state.isAddNewNode);
  const setIsAddNewNode = useInterfaceStore((state) => state.setIsAddNewNode);

  const handleNewNode = () => {
    if (isAddNewNode === null) return setIsAddNewNode(element ? element.id : '');

    return setIsAddNewNode(null);
  };

  return (
    <>
      <button className="hover:bg-gray-5 active:bg-gray-5 rounded" onClick={handleNewNode} aria-label="add cell above" type="button">
        {isAddNewNode === null ? <Plus /> : <Close />}
      </button>
      <button
        className="hover:bg-gray-5 active:bg-gray-5 rounded cursor-grab"
        aria-label="move"
        type="button"
        {...moveProps}
        onClick={() => console.log('hi')}
      >
        <Move />
      </button>
    </>
  );
};
