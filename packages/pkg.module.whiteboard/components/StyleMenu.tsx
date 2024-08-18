import React from 'react';
import {
  CommonStylePickerSet,
  DefaultColorThemePalette,
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

  return (
    <div className="w-full">
      <div className="p-6">
        <div className="flex flex-col gap-8">
          <Slider defaultValue={[0]} max={100} step={1} />
          <Slider defaultValue={[0]} max={100} step={1} />
        </div>
      </div>
      <div className="border-gray-10 border-t"></div>
      <CommonStylePickerSet theme={theme} styles={styles} />
    </div>
  );
};
