import { MoreVert, File } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';

export const SettingsDropdown = () => {
  const saveCanvas = async () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="s" variant="ghost" className="h-auto p-2">
          <MoreVert size="s" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex w-[250px] flex-col gap-1 px-2 py-1">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex h-auto gap-2 p-1" onClick={saveCanvas}>
            <File size="s" />
            <span>Скачать</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
