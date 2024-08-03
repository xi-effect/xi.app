import { Minimize, Maximize } from '@xipkg/icons';
import { useFullScreen } from 'pkg.utils.client';
import { Button } from '@xipkg/button';

export function Header() {
  const { isFullScreen, toggleFullScreen } = useFullScreen('whiteboard-container');

  return (
    <div className="bg-gray-0 text-xl-base absolute z-30 w-full px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <h1 className="text-xl-base">B1.2</h1>
          <p className="text-gray-60 text-m-base pt-2">Intermediate</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={toggleFullScreen}
            size="s"
            type="button"
            className="bg-transparent fill-gray-100"
          >
            {isFullScreen ? <Minimize /> : <Maximize />}
          </Button>
        </div>
      </div>
    </div>
  );
}
