import React from 'react';
import { colorMap, ColorMapKeys } from './consts';
import { type CustomRenderElementProps } from './RenderElement';

type TypographyPropsT = CustomRenderElementProps;

type TypoVariantsT = {
  [key: string]: string;
};

const typoVariants: TypoVariantsT = {
  paragraph: 'text-xl',
  heading1: 'text-4xl',
  heading2: 'text-3xl',
  heading3: 'text-2xl',
  mainTitle: 'text-[48px] leading-[48px]',
};

export const Typography = ({ element, children, attributes }: TypographyPropsT) => {
  const elementColor = element.color ? colorMap[element.color as ColorMapKeys] : '';

  const className = typoVariants[element.type];

  return (
    <div
      className={className}
      style={{ color: elementColor }}
      {...attributes}
    >
      {children}
    </div>
  );
};
