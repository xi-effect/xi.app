import { Minimize, Maximize } from '@xipkg/icons';
import { useFullScreen } from 'pkg.utils.client';
import { Button } from '@xipkg/button';
import { useParams } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import { SettingsDropdown } from './SettingsDropdown';

export const Header = () => {
  const { isFullScreen, toggleFullScreen } = useFullScreen('whiteboard-container');

  const params = useParams<{ 'community-id': string; 'channel-id': string }>();

  const channels = useMainSt((state) => state.channels);
  const categories = useMainSt((state) => state.categories);
  const currentBoard = channels?.filter((item) => Number(params['channel-id']) === item.id);

  if (!currentBoard) return null;

  const currentBoardsCategory =
    typeof currentBoard[0].categoryId === 'number'
      ? categories?.filter((item) => currentBoard[0].categoryId === item.id)
      : null;

  return (
    <div className="bg-gray-0 text-xl-base absolute z-30 w-full px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <h1 className="text-xl-base">{currentBoard[0].name}</h1>
          {currentBoardsCategory && (
            <p className="text-gray-60 text-m-base pt-2">{currentBoardsCategory[0].name}</p>
          )}
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
};
