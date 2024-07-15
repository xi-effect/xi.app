/* eslint-disable react/jsx-no-useless-fragment */
import { useState, ReactNode } from 'react';

import { RenderElementProps, useSlate, ReactEditor } from 'slate-react';
import { Transforms } from 'slate';

import { File as IconFile, Photo, Video } from '@xipkg/icons';
import { File as FileComponent } from '@xipkg/file';
import { Popover, PopoverTrigger, PopoverContent } from '@xipkg/popover';
import { AddFilePopover } from 'pkg.popover.add-file';

import { createDefaultNode } from './createDefaultNode';

const colorMap = {
  green: '#00A82C',
  blue: '#09AEE8',
  darkBlue: '#445AFF',
  gray: '#707070',
  purple: '#8208E1',
  pink: '#DD09C8',
  red: '#DD0D0C',
  orange: '#EC570E',
  yellow: '#FFCD37',
};

const backgroundColorMap = {
  lightGray: '#E8E8E8',
  lightRed: '#FCE9E9',
  lightOrange: '#FCE8DE',
  lightGreen: '#E4F6E9',
  lightBlue: '#EDEFFF',
  lightYellow: '#FFF5D7',
  lightPurple: '#EFDFFB',
  lightPink: '#FBE0F8',
  lightCyan: '#DFF4FC',
};

type ColorMapKeys = keyof typeof colorMap;
type BackgroundColorMapKeys = keyof typeof backgroundColorMap;

type CustomRenderElementProps = RenderElementProps & {
  element: {
    type: string;
    children?: { text: string }[];
    icon?: ReactNode;
    url?: string;
    fileName?: string;
    size?: number;
    color?: string;
    bg?: string;
  };
};

const RenderElement = ({ element, attributes, children }: CustomRenderElementProps) => {
  console.log(element);
  const editor = useSlate();
  const isEmpty = element.children && element.children[0].text === '' && element.children.length === 1;
  const elementColor = element.color ? colorMap[element.color as ColorMapKeys] : '';
  const elementBackground = element.bg ? backgroundColorMap[element.bg as BackgroundColorMapKeys] : '';

  const [open, setOpen] = useState(false);
  const [fileAttached, setFileAttached] = useState(false);

  const handleFileAttached = () => {
    setFileAttached(true);
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, { at: path });
  };

  switch (element.type) {
    case 'paragraph':
    case 'heading1':
    case 'heading2':
    case 'heading3':
      return (
        <div
          className={`${
            {
              paragraph: 'text-xl',
              heading1: 'text-4xl',
              heading2: 'text-3xl',
              heading3: 'text-2xl',
              mainTitle: 'text-[48px] leading-[48px]',
            }[element.type]
          } 
         `}
          style={{ color: elementColor }}
          {...attributes}
        >
          {children}
        </div>
      );
    case 'bulleted-list':
      return (
        <ul className="list-disc pl-4" style={{ color: elementColor }} {...attributes}>
          {children}
        </ul>
      );
    case 'numbered-list':
      return (
        <ol className="list-decimal pl-4" style={{ color: elementColor }} {...attributes}>
          {children}
        </ol>
      );
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'quote':
      return (
        <blockquote
          className="border-gray-80 space-y-2 border-l-4 px-5 py-4"
          style={{ color: elementColor }}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case 'quoteText':
      return (
        <div className="relative text-base font-medium" {...attributes}>
          {isEmpty && (
            <span className="text-gray-30 pointer-events-none absolute left-0 top-0">
              Введите текст цитаты
            </span>
          )}
          {children}
        </div>
      );
    case 'quoteAuthor':
      return (
        <cite className="text-gray-80 relative text-xs not-italic" {...attributes}>
          {isEmpty && (
            <span className="text-gray-30 pointer-events-none absolute left-0 top-0 w-20">
              Автор цитаты
            </span>
          )}
          {children}
        </cite>
      );
    case 'tip':
      return (
        <div
          className="bg-green-0 space-y-2 rounded-lg p-4"
          style={{ backgroundColor: elementBackground }}
          {...attributes}
        >
          {children}
        </div>
      );
    case 'icon':
      return (
        <div {...attributes}>
          {element.icon}
          {children}
        </div>
      );
    case 'imageBlock':
      return (
        <figure>
          <img
            alt={element.children[0].text || 'Подпись изображения'}
            src={element.url}
            className="border-gray-10 w-full rounded-lg border"
            {...attributes}
          />
          <figcaption className="text-gray-30 border-gray-30 relative mt-2 rounded-md border p-2 text-sm">
            {isEmpty && (
              <span className="pointer-events-none absolute" contentEditable={false}>
                Подпись изображения
              </span>
            )}
            {children}
          </figcaption>
        </figure>
      );
    case 'fileBlock':
      return (
        <FileComponent
          name={element.fileName || ''}
          url={element.url || ''}
          size={element.size || 0}
        />
      );
    case 'videoBlock':
      return (
        <iframe
          className="border-gray-10 h-96 w-full rounded-lg border"
          src={element.url}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share "
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      );
    case 'divider':
      return (
        <div className="bg-gray-30 my-3 h-0.5 w-full caret-transparent *:hidden" {...attributes}>
          {children}
        </div>
      );
    case 'image':
      return (
        <>
          {!fileAttached && (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div
                  className="border-gray-10 flex w-full cursor-pointer items-center rounded-lg border p-3"
                  onClick={() => setOpen(!open)}
                  onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
                  role="button"
                  tabIndex={0}
                  {...attributes}
                >
                  <Photo className="fill-brand-80 h-10 w-9" />
                  <p className="text-gray-80 ml-2 text-sm" contentEditable={false}>
                    Выберите изображение
                  </p>
                  {children}
                </div>
              </PopoverTrigger>
              <PopoverContent className="border-gray-10 w-fit rounded-3xl border p-4">
                <AddFilePopover
                  createDefaultNode={createDefaultNode}
                  setOpen={setOpen}
                  handleFileAttached={handleFileAttached}
                  type="image"
                  editor={editor}
                />
              </PopoverContent>
            </Popover>
          )}
        </>
      );
    case 'file':
      return (
        <>
          {!fileAttached && (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div
                  className="border-gray-10 flex w-full cursor-pointer items-center rounded-lg border p-3"
                  onClick={() => setOpen(!open)}
                  onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
                  role="button"
                  tabIndex={0}
                  {...attributes}
                >
                  <IconFile className="fill-brand-80 h-10 w-9" />
                  <p className="text-gray-80 ml-2 text-sm" contentEditable={false}>
                    Выберите файл
                  </p>
                  {children}
                </div>
              </PopoverTrigger>
              <PopoverContent className="border-gray-10 w-fit rounded-3xl border p-4">
                <AddFilePopover
                  createDefaultNode={createDefaultNode}
                  setOpen={setOpen}
                  handleFileAttached={handleFileAttached}
                  type="file"
                  editor={editor}
                />
              </PopoverContent>
            </Popover>
          )}
        </>
      );
    case 'video':
      return (
        <>
          {!fileAttached && (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div
                  className="border-gray-10 flex w-full cursor-pointer items-center rounded-lg border p-3"
                  onClick={(open) => !open}
                  onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
                  role="button"
                  tabIndex={0}
                  {...attributes}
                >
                  <Video className="fill-brand-80 h-10 w-9" />
                  <p className="text-gray-80 ml-2 text-sm" contentEditable={false}>
                    Выберите видео
                  </p>
                  {children}
                </div>
              </PopoverTrigger>
              <PopoverContent className="border-gray-10 w-fit rounded-3xl border p-4">
                <AddFilePopover
                  createDefaultNode={createDefaultNode}
                  setOpen={setOpen}
                  handleFileAttached={handleFileAttached}
                  type="video"
                  editor={editor}
                />
              </PopoverContent>
            </Popover>
          )}
        </>
      );
    case 'code':
      return (
        <div className="border-gray-10 block w-full rounded-lg border p-4 text-sm" {...attributes}>
          {isEmpty && (
            <span className="text-gray-30 pointer-events-none absolute font-medium">
              Введите фрагмент кода
            </span>
          )}
          {children}
        </div>
      );
    case 'link':
      return (
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

    default:
      console.warn('Unknown element type', element);
      return <></>;
  }
};

export default RenderElement;
