/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState, KeyboardEvent } from 'react';
import { useSlate } from 'slate-react';
import {
  useFloating,
  useDismiss,
  useInteractions,
  autoUpdate,
  inline,
  shift,
  FloatingFocusManager,
  flip,
  FloatingDelayGroup,
} from '@floating-ui/react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../Tooltip';
import { toggleFormat } from './functions/toggleFormat';
import { FormatButton } from './FormatButton';

export const InlineToolbar = () => {
  const editor = useSlate();

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'top',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [flip(), inline(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);

  const { getFloatingProps } = useInteractions([dismiss]);

  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
      if (
        event &&
        event?.target &&
        refs.floating.current?.contains(event?.target as Element | null)
      ) {
        return;
      }

      setTimeout(() => {
        const selection = window.getSelection();
        const range =
          typeof selection?.rangeCount === 'number' && selection.rangeCount > 0
            ? selection.getRangeAt(0)
            : null;

        if (selection?.isCollapsed) {
          setIsOpen(false);
          return;
        }

        if (range) {
          refs.setReference({
            getBoundingClientRect: () => range.getBoundingClientRect(),
            getClientRects: () => range.getClientRects(),
          });
          setIsOpen(true);
        }
      });
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (
        event &&
        event?.target &&
        refs.floating.current?.contains(event.target as Element | null)
      ) {
        return;
      }

      if (window.getSelection()?.isCollapsed) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [refs]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    const isBold =
      (isMac && event.metaKey && event.key === 'b') ||
      (!isMac && event.ctrlKey && event.key === 'b');
    const isItalic =
      (isMac && event.metaKey && event.key === 'i') ||
      (!isMac && event.ctrlKey && event.key === 'i');
    const isUnderline =
      (isMac && event.metaKey && event.key === 'u') ||
      (!isMac && event.ctrlKey && event.key === 'u');
    const isStroke =
      (isMac && event.metaKey && event.key === 's') ||
      (!isMac && event.ctrlKey && event.key === 's');

    const selection = window.getSelection();
    if (typeof selection?.rangeCount === 'number') {
      if (isBold) toggleFormat(editor, 'bold');
      if (isItalic) toggleFormat(editor, 'italic');
      if (isUnderline) toggleFormat(editor, 'underlined');
      if (isStroke) toggleFormat(editor, 'stroke');
    }
  };

  useEffect(() => {
    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 's' &&
        (/Mac|iPod|iPhone|iPad/.test(navigator.platform) ? event.metaKey : event.ctrlKey)
      ) {
        event.preventDefault();
      }

      if (event && event.target) {
        handleKeyDown(event as KeyboardEvent<HTMLDivElement>);
      }
    };

    // TODO: разобраться с типизацией
    // @ts-ignore
    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => {
      // @ts-ignore
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              zIndex: 1000,
            }}
            {...getFloatingProps()}
            className="bg-gray-0 border-gray-10 box-border flex h-[40px] flex-row items-center justify-center gap-1 rounded-lg border px-2 drop-shadow-md"
          >
            <FloatingDelayGroup delay={{ open: 1500, close: 0 }}>
              <Tooltip placement="bottom">
                <TooltipTrigger>
                  <FormatButton format="bold" />
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <p>
                      <b>Bold</b>
                    </p>
                    <p>Ctrl+B</p>
                  </div>
                </TooltipContent>
              </Tooltip>
              <Tooltip placement="bottom">
                <TooltipTrigger>
                  <FormatButton format="italic" />
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <p>
                      <i>Italicize</i>
                    </p>
                    <p>Ctrl+I</p>
                  </div>
                </TooltipContent>
              </Tooltip>
              <Tooltip placement="bottom">
                <TooltipTrigger>
                  <FormatButton format="underlined" />
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <p>
                      <u>Underline</u>
                    </p>
                    <p>Ctrl+U</p>
                  </div>
                </TooltipContent>
              </Tooltip>
              <Tooltip placement="bottom">
                <TooltipTrigger>
                  <FormatButton format="stroke" />
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <p>
                      <s>Strike-through</s>
                    </p>
                    <p>Ctrl+S</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </FloatingDelayGroup>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};
