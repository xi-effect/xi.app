import React, { ComponentProps, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { FloatingDelayGroup } from '@floating-ui/react';
import { Close, Move, Plus } from '@xipkg/icons';
import { useReadOnly } from 'slate-react';
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';
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
      <FloatingDelayGroup delay={{ open: 500, close: 0 }}>
        <Tooltip
          placement="bottom"
        >
          <TooltipTrigger>
            <AddNewNode
              element={element}
              isOpen={isOpenNewNode}
              setIsOpen={setIsOpenNewNode}
            >
              <button
                className="hover:bg-gray-5 active:bg-gray-5 rounded"
                onClick={handleNewNode}
                type="button"
              >
                {isOpenNewNode ? <Close /> : <Plus />}
              </button>
            </AddNewNode>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <p><b>Клик</b> для добавления снизу</p>
              <p><b>Alt-клик</b> для добавления сверху</p>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip
          placement="bottom"
        >
          <TooltipTrigger>
            <ElementControlsModal
              element={element}
              isOpen={isOpenElementControls}
              setIsOpen={handleElementControls}
            >
              <button
                className="hover:bg-gray-5 active:bg-gray-5 rounded cursor-pointer"
                aria-label="move"
                type="button"
                {...moveProps}
                onMouseUp={handleElementControls}
              >
                <Move />
              </button>
            </ElementControlsModal>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <p><b>Перетащите</b> для перемещения</p>
              <p><b>Клик</b> для открытия меню</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </FloatingDelayGroup>
    </div>
  );
};
