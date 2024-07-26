import { Arrow, Cursor, Eraser, Figures, Hand, Image, Pen, Sticker, TText } from '@xipkg/icons';
import { TMenuPopupItem } from './components/MenuPopupContent';

export type TNavbarElement = {
  action: string;
  title: string;
  icon: React.ReactNode | null;
  hasAToolTip?: boolean;
  menuPopupContent?: TMenuPopupItem[];
};

export const navBarElements: TNavbarElement[] = [
  { action: 'select', title: 'Select', icon: <Cursor /> },
  { action: 'hand', title: 'Hand', icon: <Hand /> },
  { action: 'draw', title: 'Draw', icon: <Pen /> },
  {
    action: 'note',
    title: 'Sticker',
    icon: <Sticker />,
    hasAToolTip: true,
    menuPopupContent: [
      {
        icon: <Sticker className="fill-gray-60" />,
        action: 'set-style',
        color: 'grey',
      },
      {
        icon: <Sticker className="fill-brand-100" />,
        action: 'set-style',
        color: 'blue',
      },
      {
        icon: <Sticker className="fill-red-100" />,
        action: 'set-style',
        color: 'red',
      },
      {
        icon: <Sticker className="fill-green-100" />,
        action: 'set-style',
        color: 'green',
      },
      {
        icon: <Sticker className="fill-orange-100" />,
        action: 'set-style',
        color: 'light-red',
      },
      {
        icon: <Sticker className="fill-yellow-100" />,
        action: 'set-style',
        color: 'yellow',
      },
      {
        icon: <Sticker className="fill-violet-100" />,
        action: 'set-style',
        color: 'violet',
      },
      {
        icon: <Sticker className="fill-pink-100" />,
        action: 'set-style',
        color: 'light-violet',
      },
      {
        icon: <Sticker className="fill-cyan-100" />,
        action: 'set-style',
        color: 'light-blue',
      },
    ],
  },
  { action: 'text', title: 'Text', icon: <TText /> },
  { action: 'rectangle', title: 'Shapes', icon: <Figures /> },
  { action: 'arrow', title: 'Arrow', icon: <Arrow /> },
  { action: 'image', title: 'Image', icon: <Image /> },
  { action: 'eraser', title: 'Eraser', icon: <Eraser /> },
];
