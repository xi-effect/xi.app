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

export const StyleMenu = () => {
  const editor = useEditor();
  const isDarkMode = useIsDarkMode();
  const styles = useRelevantStyles();

  if (!styles) return null;
  const theme = getDefaultColorTheme({ isDarkMode: isDarkMode });

  const sizes = ['s', 'm', 'l', 'xl'] as const;

  const handleSize = (value: number[]) => {
    const size = sizes[value[0] - 1];
    editor.setStyleForNextShapes(DefaultSizeStyle, size);
  };

  const handleOpacity = (value: number[]) => {
    editor.setOpacityForNextShapes(value[0] / 100);
  };

  return (
    <div className="border-gray-10 bg-gray-0 w-full">
      <div className="p-6">
        <div className="flex flex-col gap-8">
          <Slider
            onValueChange={(value) => handleSize(value)}
            defaultValue={[2]}
            min={1}
            max={4}
            step={1}
            minStepsBetweenThumbs={1}
          />
          <Slider
            onValueChange={(value) => handleOpacity(value)}
            defaultValue={[100]}
            min={10}
            max={100}
            step={1}
          />
        </div>
      </div>
      <div className="border-gray-10 border-t pb-4"></div>
      <CommonStylePickerSet theme={theme} styles={styles} />
    </div>
  );
};
