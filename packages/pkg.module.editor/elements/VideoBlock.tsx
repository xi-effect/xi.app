import React from 'react';
import { type CustomRenderElementProps } from './RenderElement';

type VideoBlockPropsT = Omit<CustomRenderElementProps, 'children' | 'attributes'>;

export const VideoBlock = ({ element }: VideoBlockPropsT) => (
  <iframe
    className="border-gray-10 h-96 w-full rounded-lg border"
    src={element.url}
    title="Video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share "
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
);
