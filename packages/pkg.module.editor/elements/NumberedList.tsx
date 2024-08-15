import React from 'react';
import { colorMap, ColorMapKeys } from './consts';
import { type CustomRenderElementProps } from './RenderElement';

type NumberedListPropsT = CustomRenderElementProps;

export const NumberedList = ({ element, children, attributes }: NumberedListPropsT) => {
  const elementColor = element.color ? colorMap[element.color as ColorMapKeys] : '';

  return (
    <ol className="list-decimal pl-4" style={{ color: elementColor }} {...attributes}>
      {children}
    </ol>
  );
};
