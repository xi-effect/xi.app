import React from 'react';
import { type CustomRenderElementProps } from './RenderElement';
import { colorMap, ColorMapKeys } from './consts';

type QuotePropsT = CustomRenderElementProps;

export const Quote = ({ element, children, attributes }: QuotePropsT) => {
  const elementColor = element.color ? colorMap[element.color as ColorMapKeys] : '';

  return (
    <blockquote
      className="border-gray-80 space-y-2 border-l-4 px-5 py-4"
      style={{ color: elementColor }}
      {...attributes}
    >
      {children}
    </blockquote>
  );
};
