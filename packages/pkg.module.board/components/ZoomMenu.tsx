import { Plus, Minus } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { useUIStore } from '../store';

type ZoomMenuPropsT = {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
};

export const ZoomMenu = ({ zoomIn, zoomOut, resetZoom }: ZoomMenuPropsT) => {
  const { scale } = useUIStore();

  return (
    <div className="absolute bottom-4 right-4 z-30">
      <div className="bg-gray-0 border-gray-10 flex items-center justify-center gap-2 rounded-2xl border p-1">
        <Button
          className="hover:bg-brand-0 pointer-events-auto flex h-8 w-8 items-center justify-center rounded-xl p-0 focus:bg-transparent"
          variant="ghost"
          onClick={() => zoomOut()}
        >
          <Minus className="h-4 w-4 fill-gray-100 lg:h-6 lg:w-6" />
        </Button>
        <Button
          className="min-w-[60px] items-center justify-center px-2 py-1 hover:bg-transparent focus:bg-transparent active:bg-transparent"
          variant="ghost"
          size="s"
          onClick={() => resetZoom()}
        >
          {scale < 0.01 ? '< 1%' : `${(scale * 100).toFixed(0)}%`}
        </Button>
        <Button
          className="hover:bg-brand-0 pointer-events-auto flex h-8 w-8 items-center justify-center rounded-xl p-0 focus:bg-transparent"
          variant="ghost"
          onClick={() => zoomIn()}
        >
          <Plus className="h-4 w-4 lg:h-6 lg:w-6" />
        </Button>
      </div>
    </div>
  );
};
