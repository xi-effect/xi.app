import React from 'react';
import { useSlate } from 'slate-react';
import { Button } from '@xipkg/button';
import { Bold, Italic, Underline, Stroke } from '@xipkg/icons';
import { isFormatActive } from './functions/isFormatActive';
import { toggleFormat } from './functions/toggleFormat';

export const FormatButton = ({
  format,
  onClick,
}: {
  format: 'bold' | 'italic' | 'underlined' | 'stroke';
  onClick?: () => void;
}) => {
  const editor = useSlate();
  const isActive = isFormatActive(editor, format);
  const iconStyle = 'group-hover:fill-brand-100 h-4 w-4 fill-gray-100';

  return (
    <Button
      className={`${isActive ? 'bg-brand-0 *:fill-brand-100' : 'bg-gray-0'} hover:bg-brand-0 hover:fill-brand-100 group h-6 w-6 rounded-sm p-0`}
      variant="ghost"
      onMouseDown={(event) => {
        event.preventDefault();
        if (onClick) {
          onClick();
          toggleFormat(editor, format);
        } else {
          toggleFormat(editor, format);
        }
      }}
    >
      {(format === 'bold' && <Bold className={iconStyle} />) ||
        (format === 'italic' && <Italic className={iconStyle} />) ||
        (format === 'underlined' && <Underline className={iconStyle} />) ||
        (format === 'stroke' && <Stroke className={iconStyle} />)}
    </Button>
  );
};
