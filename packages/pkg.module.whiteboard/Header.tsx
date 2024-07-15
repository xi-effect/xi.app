import { Minimize, Maximize } from '@xipkg/icons';
import { useFullScreen } from '../pkg.utils.client/useFullScreen';
export function Header() {
  const { isFullScreen, toggleFullScreen } = useFullScreen('whiteboard-container');
  return (
    <div className="absolute z-[300] w-full bg-white px-4 py-2 text-3xl">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <h1 className="text-[24px]">B1.2</h1>
          <p className="text-gray-60 py-1 text-[16px]">Intermediate</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleFullScreen} type="button" className="bg-transparent fill-gray-100">
            {isFullScreen ? <Minimize /> : <Maximize />}
          </button>
        </div>
      </div>
    </div>
  );
}
