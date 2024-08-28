import { useState } from 'react';
import { DefaultColorStyle, useEditor } from 'tldraw';
import { colorOptions } from '../utils/customConfig';

type ColorOptionT = (typeof colorOptions)[number]['name'];

type ColorCircleT = {
  colorClass: string;
  isSelected: boolean;
  handleClick: () => void;
};

const ColorCircle = ({ colorClass, isSelected, handleClick }: ColorCircleT) => (
  <div
    className={`m-auto rounded-full p-0.5 ${isSelected ? 'border-2 border-black' : 'border-2 border-transparent'}`}
  >
    <div
      onClick={() => handleClick()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      className={`h-8 w-8 cursor-pointer rounded-full ${colorClass}`}
    />
  </div>
);

export const ColorGrid = () => {
  const [selectedColor, setSelectedColor] = useState<ColorOptionT>('black');
  const editor = useEditor();

  const handleColorClick = (colorName: ColorOptionT) => {
    setSelectedColor(colorName);

    if (editor) {
      editor.setStyleForNextShapes(DefaultColorStyle, colorName);
    }
  };

  return (
    <div className="m-auto grid grid-cols-5 gap-2">
      {colorOptions.map(({ name, class: colorClass }) => (
        <ColorCircle
          key={name}
          colorClass={colorClass}
          isSelected={selectedColor === name}
          handleClick={() => handleColorClick(name)}
        />
      ))}
    </div>
  );
};
