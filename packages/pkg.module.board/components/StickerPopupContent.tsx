import { DefaultColorStyle, StyleProp, useEditor } from 'tldraw';
import { PopupItemT } from '../utils/navBarElements';

type StickerPopupContentT = {
  menuPopupContent: PopupItemT[];
};

export const StickerPopupContent = ({ menuPopupContent }: StickerPopupContentT) => {
  const editor = useEditor();

  return (
    <div className="flex gap-2">
      {menuPopupContent?.map((item: PopupItemT) => (
        <button
          type="button"
          className="bg-gray-0 rounded-2 flex h-8 w-8 items-center justify-center"
          onClick={() => {
            editor.setStyleForNextShapes(
              DefaultColorStyle as unknown as StyleProp<string>,
              item.color,
            );
          }}
        >
          <div className="text-s-base">{item.icon ? item.icon : item.action}</div>
        </button>
      ))}
    </div>
  );
};
