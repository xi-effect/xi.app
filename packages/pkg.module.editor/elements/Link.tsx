import React from 'react';
import { type CustomRenderElementProps } from './RenderElement';

type LinkPropsT = CustomRenderElementProps;

export const Link = ({ element, children, attributes }: LinkPropsT) => (
  <a
    {...attributes}
    href={element.url}
    target="_blank"
    rel="noopener noreferrer"
    className="cursor-pointer underline after:absolute after:-bottom-0.5 after:left-0 after:bg-gray-100 after:decoration-solid"
    // slate блокирует открытие ссылки при клике в режиме редактирования
    // код ниже исправляет это
    onClick={(e) => {
      const target = e.currentTarget;
      target.contentEditable = 'false';
      setTimeout(() => {
        target.contentEditable = 'true';
      }, 200);
    }}
  >
    {children}
  </a>
);
