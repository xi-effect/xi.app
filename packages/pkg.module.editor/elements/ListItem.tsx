import React from 'react';
import { type CustomRenderElementProps } from './RenderElement';

type ListItemPropsT = Omit<CustomRenderElementProps, 'element'>;

export const ListItem = ({ children, attributes }: ListItemPropsT) => (
  <li {...attributes}>{children}</li>
);
