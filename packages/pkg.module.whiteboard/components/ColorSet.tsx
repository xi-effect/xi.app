import React, { useState } from 'react';
import { useEditor } from '@tldraw/editor';
import { DefaultColorStyle } from '@tldraw/tlschema';

enum ColorEnum {
  Black = 'black',
  Grey = 'grey',
  LightViolet = 'light-violet',
  Violet = 'violet',
  Blue = 'blue',
  LightBlue = 'light-blue',
  Yellow = 'yellow',
  Orange = 'orange',
  Green = 'green',
  LightGreen = 'light-green',
  LightRed = 'light-red',
  Red = 'red',
  White = 'white',
}
const colorOptions = [
  { name: ColorEnum.Black, class: 'bg-gray-100' },
  { name: ColorEnum.Grey, class: 'bg-gray-50' },
  { name: ColorEnum.LightViolet, class: 'bg-violet-20' },
  { name: ColorEnum.Violet, class: 'bg-violet-100' },
  { name: ColorEnum.Blue, class: 'bg-brand-100' },
  { name: ColorEnum.LightBlue, class: 'bg-cyan-20' },
  { name: ColorEnum.Yellow, class: 'bg-yellow-100' },
  { name: ColorEnum.Orange, class: 'bg-orange-100' },
  { name: ColorEnum.Green, class: 'bg-green-100' },
  { name: ColorEnum.LightGreen, class: 'bg-green-20' },
  { name: ColorEnum.LightRed, class: 'bg-red-20' },
  { name: ColorEnum.Red, class: 'bg-red-100' },
  { name: ColorEnum.White, class: 'bg-white' },
];

interface ColorCircleProps {
  colorClass: string;
  isSelected: boolean;
  onClick: () => void;
}

const ColorCircle: React.FC<ColorCircleProps> = ({ colorClass, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`h-8 w-8 cursor-pointer rounded-full ${colorClass} ${isSelected ? 'border-2 border-black p-2' : 'border-2 border-transparent'}`}
    ></div>
  );
};

export const ColorGrid: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<ColorEnum | null>(null);
  const editor = useEditor();

  const handleColorClick = (colorName: ColorEnum) => {
    setSelectedColor(colorName);

    if (editor) {
      editor.setStyleForNextShapes(DefaultColorStyle, colorName);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-2">
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
