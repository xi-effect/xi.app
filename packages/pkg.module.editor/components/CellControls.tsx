import React, { ComponentProps, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { FloatingDelayGroup } from '@floating-ui/react';
import { Close, Move, Plus } from '@xipkg/icons';
import { useReadOnly } from 'slate-react';
import { Button } from '@xipkg/button';
import { type CustomElement } from '@xipkg/slatetypes';
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';
import { AddNewNode } from './AddNewNode';
import { ElementControlsModal } from './ElementControlsModal';

type PortalPropsT = {
  children: ReactNode;
};

export const Portal = ({ children }: PortalPropsT) =>
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
    <div
      className={`${isOpenNewNode || isOpenElementControls ? 'opacity-100' : ''} absolute flex h-[25px] w-[48px] items-end gap-2 opacity-0 transition *:flex *:size-5 *:items-center *:justify-center *:bg-transparent group-visited/node:opacity-100 group-hover/node:opacity-100`}
    >
      <FloatingDelayGroup delay={{ open: 1500, close: 0 }}>
        <Tooltip placement="bottom">
          <TooltipTrigger>
            <AddNewNode element={element} isOpen={isOpenNewNode} setIsOpen={setIsOpenNewNode}>
              <Button
                className="hover:bg-gray-5 active:bg-gray-5 group h-5 w-5 rounded p-0"
                variant="ghost"
                onClick={handleNewNode}
              >
                {isOpenNewNode ? <Close /> : <Plus />}
              </Button>
            </AddNewNode>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <p>
                <b>Клик</b> для добавления снизу
              </p>
              <p>
                <b>Alt-клик</b> для добавления сверху
              </p>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip placement="bottom">
          <TooltipTrigger>
            <ElementControlsModal
              element={element}
              isOpen={isOpenElementControls}
              setIsOpen={handleElementControls}
            >
              <Button
                className="hover:bg-gray-5 active:bg-gray-5 group h-5 w-5 rounded p-0"
                aria-label="move"
                variant="ghost"
                {...moveProps}
                onMouseUp={handleElementControls}
              >
                <Move />
              </Button>
            </ElementControlsModal>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <p>
                <b>Перетащите</b> для перемещения
              </p>
              <p>
                <b>Клик</b> для открытия меню
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </FloatingDelayGroup>
    </div>
  );
};
