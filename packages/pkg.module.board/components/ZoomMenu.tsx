import { Plus, Minus } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { useUIStore } from '../store';

export const ZoomMenu = () => {
  // Получаем значения из UI-стора
  const { scale, zoomIn, zoomOut } = useUIStore();

  return (
    <div className="border-gray-10 absolute bottom-3 right-3 z-30">
      <div className="bg-gray-0 border-gray-10 flex items-center justify-center rounded-xl border p-1">
        <Button
          className="hover:bg-brand-0 pointer-events-auto flex h-6 w-6 items-center justify-center rounded-lg p-0 lg:h-8 lg:w-8"
          variant="ghost"
          onClick={() => zoomOut()}
        >
          <Minus className="h-4 w-4 fill-gray-100 lg:h-6 lg:w-6" />
        </Button>
        <div className="flex h-8 items-center justify-center">{(scale * 100).toFixed(0)}%</div>
        <Button
          className="hover:bg-brand-0 pointer-events-auto flex h-6 w-6 items-center justify-center rounded-lg p-0 lg:h-8 lg:w-8"
          variant="ghost"
          onClick={() => zoomIn()}
        >
          <Plus className="h-4 w-4 lg:h-6 lg:w-6" />
        </Button>
      </div>
    </div>
  );
};
