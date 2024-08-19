import React from 'react';
import { type CustomRenderElementProps } from './RenderElement';

type IconPropsT = CustomRenderElementProps;

export const Icon = ({ element, children, attributes }: IconPropsT) => (
  <div className="flex flex-row gap-2" {...attributes}>
    <div>{element.icon}</div>
    {children}
  </div>
);
