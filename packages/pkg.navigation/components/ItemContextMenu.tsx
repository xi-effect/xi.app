import { ReactNode } from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from '@xipkg/contextmenu';

type ItemContextMenuT = {
  handleEdit: () => void;
  handleDelete: () => void;
  children: ReactNode;
  isTriggerActive?: boolean | null;
};

export const ItemContextMenu = ({
  handleEdit,
  handleDelete,
  children,
  isTriggerActive,
}: ItemContextMenuT) => (
  <ContextMenu>
    <ContextMenuTrigger disabled={!isTriggerActive}>{children}</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem onClick={handleEdit}>Редактировать</ContextMenuItem>
      <ContextMenuItem onClick={handleDelete}>Удалить</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);
