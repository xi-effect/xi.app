import React from 'react';
import { File as FileComponent } from '@xipkg/file';
import { type CustomRenderElementProps } from './RenderElement';

type FileBlockPropsT = Omit<CustomRenderElementProps, 'attributes' | 'children'>;

export const FileBlock = ({ element }: FileBlockPropsT) => (
  <FileComponent name={element.fileName || ''} url={element.url || ''} size={element.size || 0} />
);
