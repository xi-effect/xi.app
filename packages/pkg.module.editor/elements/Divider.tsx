import React from 'react';
import { type CustomRenderElementProps } from './RenderElement';

type DividerPropsT = Omit<CustomRenderElementProps, 'element'>;

export const Divider = ({ children, attributes }: DividerPropsT) => (
  <div className="bg-gray-30 my-3 h-0.5 w-full caret-transparent *:hidden" {...attributes}>
    {children}
  </div>
);
