import React, { useState } from 'react';
import { Check } from '@xipkg/icons';

interface ColorPickerProps {
  colors: string[];
  onChange: (value: string) => void;
}

const ColorPicker = ({ colors, onChange }: ColorPickerProps) => {
  const [currentColor, setCurrentColor] = useState(colors[0]);

  return (
    <div className="space-y-4">
      <div style={{ backgroundColor: currentColor }} className="h-16 rounded-lg" />
      <div className="flex flex-wrap gap-2">
        {colors.map((el) => (
          <button
            key={el}
            type="button"
            aria-label="Изменить цвет"
            onClick={() => {
              setCurrentColor(el);
              onChange(el);
            }}
            className="grid size-7 place-content-center rounded-lg"
            style={{ backgroundColor: el }}
          >
            {el === currentColor ? <Check className="fill-white" /> : null}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
