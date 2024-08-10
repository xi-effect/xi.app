import { Minimize, Maximize } from '@xipkg/icons';
import { useFullScreen } from 'pkg.utils.client';
import { Button } from '@xipkg/button';
import { SettingsDropdown } from './SettingsDropdown';

export function Header() {
  const { isFullScreen, toggleFullScreen } = useFullScreen('whiteboard-container');

  return (
    <div className="bg-gray-0 text-xl-base absolute z-30 w-full px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <h1 className="text-xl-base">B1.2</h1>
          <p className="text-gray-60 text-m-base pt-2">Intermediate</p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            onClick={toggleFullScreen}
            size="s"
            type="button"
            className="h-auto p-2"
          >
            {isFullScreen ? <Minimize size="s" /> : <Maximize size="s" />}
          </Button>
          <SettingsDropdown />
        </div>
      </div>
    </div>
  );
}
