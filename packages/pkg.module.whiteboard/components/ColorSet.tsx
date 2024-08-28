import React, { useState } from 'react';
import { useEditor } from '@tldraw/editor';
import { DefaultColorStyle } from '@tldraw/tlschema';

enum ColorEnum {
  Black = 'black',
  Grey = 'grey',
  Violet = 'violet',
  Blue = 'blue',
  LightBlue = 'light-blue',
  Yellow = 'yellow',
  Orange = 'orange',
  Green = 'green',
  Red = 'red',
  Pink = 'light-violet',
}
const colorOptions = [
  { name: ColorEnum.Black, class: 'bg-gray-100' },
  { name: ColorEnum.Blue, class: 'bg-brand-80' },
  { name: ColorEnum.Red, class: 'bg-red-80' },
  { name: ColorEnum.Green, class: 'bg-green-80' },
  { name: ColorEnum.Orange, class: 'bg-orange-80' },
  { name: ColorEnum.Yellow, class: 'bg-yellow-100' },
  { name: ColorEnum.Violet, class: 'bg-violet-100' },
  { name: ColorEnum.Pink, class: 'bg-pink-100' },
  { name: ColorEnum.LightBlue, class: 'bg-cyan-100' },
  { name: ColorEnum.Grey, class: 'bg-gray-60' },
];

interface ColorCircleProps {
  colorClass: string;
  isSelected: boolean;
  onClick: () => void;
}

const ColorCircle: React.FC<ColorCircleProps> = ({ colorClass, isSelected, onClick }) => {
  return (
    <div
      className={`m-auto rounded-full p-0.5 ${isSelected ? 'border-2 border-black' : 'border-2 border-transparent'}`}
    >
      <div onClick={onClick} className={`h-8 w-8 cursor-pointer rounded-full ${colorClass}`}></div>
    </div>
  );
};

export const ColorGrid: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<ColorEnum>(ColorEnum.Black);
  const editor = useEditor();

  const handleColorClick = (colorName: ColorEnum) => {
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
          onClick={() => handleColorClick(name)}
        />
      ))}
    </div>
  );
};
