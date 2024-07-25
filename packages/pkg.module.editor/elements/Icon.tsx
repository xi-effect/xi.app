import React from 'react';
import { type CustomRenderElementProps } from './RenderElement';

type IconPropsT = CustomRenderElementProps;

export const Icon = ({ element, children, attributes }: IconPropsT) => (
  <div {...attributes}>
    {element.icon}
    {children}
  </div>
);
