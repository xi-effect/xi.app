import './styleMenu.css';
import {
  CommonStylePickerSet,
  DefaultSizeStyle,
  getDefaultColorTheme,
  useEditor,
  useIsDarkMode,
  useRelevantStyles,
} from 'tldraw';
import { Slider } from '@xipkg/slider';
import { useState } from 'react';

const sizes = ['s', 'm', 'l', 'xl'] as const;

export const StyleMenu = () => {
  const editor = useEditor();
  const isDarkMode = useIsDarkMode();
  const styles = useRelevantStyles();

  const [currentSize, setCurrentSize] = useState<string>('m');
  const [currentOpacity, setCurrentOpacity] = useState<number>(100);

  if (!styles) return null;
  const theme = getDefaultColorTheme({
    isDarkMode,
  });

  const handleSize = (value: number[]) => {
    const size = sizes[value[0] - 1];
    setCurrentSize(size);
    editor.setStyleForNextShapes(DefaultSizeStyle, size);
  };

  const handleOpacity = (value: number[]) => {
    const opacity = value[0] / 100;
    editor.setOpacityForNextShapes(opacity);
    setCurrentOpacity(value[0]);
  };

  return (
    <div className="border-gray-10 bg-gray-0 w-full">
      <div className="p-6">
        <div className="flex flex-col justify-center gap-6">
          <div className="flex items-center justify-between gap-4">
            <div className="w-full">
              <Slider
                onValueChange={(value) => handleSize(value)}
                defaultValue={[2]}
                min={1}
                max={4}
                step={1}
                minStepsBetweenThumbs={1}
              />
            </div>
            <div className="w-4">
              <p>{currentSize.toUpperCase()}</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="w-full">
              <Slider
                onValueChange={(value) => handleOpacity(value)}
                defaultValue={[100]}
                min={10}
                max={100}
                step={1}
              />
            </div>
            <div className="w-4">
              <p>{currentOpacity}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-gray-10 border-t pb-1" />
      <div className="px-4 py-2">
        <CommonStylePickerSet theme={theme} styles={styles} />
      </div>
    </div>
  );
};
