import { StateNode } from 'tldraw';
import 'tldraw/tldraw.css';

const OFFSET = 100;

export class StickerTool extends StateNode {
  static override id = 'sticker';

  override onEnter = () => {
    this.editor.setCursor({ type: 'cross', rotation: 0 });
  };

  override onPointerDown = () => {
    const { currentPagePoint } = this.editor.inputs;
    this.editor.createShape({
      type: 'note',
      x: currentPagePoint.x - OFFSET,
      y: currentPagePoint.y - OFFSET,
      props: {
        align: 'start',
        verticalAlign: 'start',
      },
    });
  };
}
