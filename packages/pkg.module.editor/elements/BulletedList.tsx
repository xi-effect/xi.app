import React from 'react';
import { colorMap, ColorMapKeys } from './consts';
import { type CustomRenderElementProps } from './RenderElement';

type BulletedListPropsT = CustomRenderElementProps;

export const BulletedList = ({ element, children, attributes }: BulletedListPropsT) => {
  const elementColor = element.color ? colorMap[element.color as ColorMapKeys] : '';

  return (
    <ul className="list-disc pl-4" style={{ color: elementColor }} {...attributes}>
      {children}
    </ul>
  );
};
