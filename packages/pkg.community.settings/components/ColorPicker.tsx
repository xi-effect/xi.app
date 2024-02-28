import React, { useState } from 'react';
import { Check } from '@xipkg/icons';

interface ColorPickerProps {
  colors: string[];
  onChange: (value: string) => void;
}

const ColorPicker = (props: ColorPickerProps) => {
  const [currentColor, setCurrentColor] = useState(props.colors[0]);

  return (
    <div className="space-y-4">
      <div style={{ backgroundColor: currentColor }} className="h-16 rounded-lg"></div>
      <div className="flex flex-wrap gap-2">
        {props.colors.map((el) => (
          <button
            onClick={() => {
              setCurrentColor(el);
              props.onChange(el);
            }}
            className="w-6 h-7 rounded-lg"
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
