import React from 'react';
import { type CustomRenderElementProps } from './RenderElement';
import { backgroundColorMap, BackgroundColorMapKeys } from './consts';

type TipPropsT = CustomRenderElementProps;

export const Tip = ({ element, children, attributes }: TipPropsT) => {
  const elementBackground = element.bg
    ? backgroundColorMap[element.bg as BackgroundColorMapKeys]
    : '';

  return (
    <div
      className="bg-green-0 space-y-2 rounded-lg p-4"
      style={{ backgroundColor: elementBackground }}
      {...attributes}
    >
      {children}
    </div>
  );
};
