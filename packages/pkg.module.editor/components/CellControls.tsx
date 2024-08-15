import React, { ComponentProps, ReactNode } from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Tooltip, TooltipContent, TooltipTrigger } from '@xipkg/tooltip';
import { Close, Move, Plus } from '@xipkg/icons';
import { useReadOnly } from 'slate-react';
import { type CustomElement } from '../slate';
import { AddNewNode } from './AddNewNode';
import { ElementControlsModal } from './ElementControlsModal';

type PortalProps = {
  children: ReactNode;
};

export const Portal = ({ children }: PortalProps) =>
  typeof document === 'object' ? ReactDOM.createPortal(children, document.body) : null;

export const CellControls = ({
  moveProps,
  element,
}: Partial<Record<'moveProps', ComponentProps<'button'>> & { element: CustomElement }>) => {
  const isReadOnly = useReadOnly();

  const [isOpenNewNode, setIsOpenNewNode] = React.useState(false);
  const [isOpenElementControls, setIsOpenElementControls] = React.useState(false);

  const handleNewNode = () => {
    setIsOpenNewNode((prev) => !prev);
  };

  const handleElementControls = () => {
    setIsOpenElementControls((prev) => !prev);
  };

  if (!element || isReadOnly) return null;

  return (
    <div className={`${isOpenNewNode || isOpenElementControls ? 'opacity-100' : ''} absolute flex items-end opacity-0 transition *:size-5 *:flex *:items-center *:justify-center *:bg-transparent gap-2 h-[25px] w-[48px] group-hover/node:opacity-100 group-visited/node:opacity-100`}>
      <AddNewNode
        element={element}
        isOpen={isOpenNewNode}
        setIsOpen={setIsOpenNewNode}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="hover:bg-gray-5 active:bg-gray-5 rounded"
              onClick={handleNewNode}
              type="button"
            >
              {isOpenNewNode ? <Close /> : <Plus />}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={15}
          >
            <div>
              <p><b>Клик</b> для добавления снизу</p>
              <p><b>Alt-клик</b> для добавления сверху</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </AddNewNode>
      <ElementControlsModal
        element={element}
        isOpen={isOpenElementControls}
        setIsOpen={handleElementControls}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="hover:bg-gray-5 active:bg-gray-5 rounded cursor-pointer"
              aria-label="move"
              type="button"
              {...moveProps}
              onMouseUp={handleElementControls}
            >
              <Move />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={15}
          >
            <div>
              <p><b>Перетащите</b> для перемещения</p>
              <p><b>Клик</b> для открытия меню</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </ElementControlsModal>
    </div>
  );
};
