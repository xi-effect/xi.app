/* eslint-disable consistent-return */
import { MoreVert, File } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import { useEditor, exportToBlob } from 'tldraw';

export const SettingsDropdown = () => {
  const editor = useEditor();

  const saveCanvas = async () => {
    const shapeIds = editor.getCurrentPageShapeIds();
    if (shapeIds.size === 0) {
      toast('No shapes on the canvas');
      return;
    }
    const blob = await exportToBlob({
      editor,
      ids: [...shapeIds],
      format: 'png',
      opts: { background: false },
    });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'whiteboard.png';
    link.click();
  };

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
