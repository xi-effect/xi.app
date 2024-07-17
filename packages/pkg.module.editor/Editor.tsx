/* eslint-disable import/no-extraneous-dependencies */

import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

import { createEditor, Transforms, Editor, Range, Element as SlateElement } from 'slate';
import { Slate, withReact, Editable, ReactEditor, RenderElementProps, useSlate } from 'slate-react';
import { withHistory } from 'slate-history';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from '@xipkg/dropdown';
import { Bold, Italic, Underline, Stroke, Link } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { Input } from '@xipkg/input';
import { isUrl, isImageUrl } from './utils/isUrl';
import { createDefaultNode } from './utils/createDefaultNode';
import rootElements, { type EditorRootElementOptions } from './const/rootElements';
import { withNodeId, makeNodeId } from './plugins/withNodeId';
import { toPx } from './utils/toPx';
import mockValues from './const/mockValues';
import normalizeQuoteNode from './plugins/normalizeQuoteNode';
import { type CommonCustomElementType } from './slate';

import RenderElement from './utils/renderElement';
import createNode from './utils/createNode';
import { Portal, CellControls } from './components';

const useEditor = () =>
  useMemo(() => {
    const editor = withInlines(withNodeId(withHistory(withReact(createEditor()))));

    const { normalizeNode, isVoid } = editor;

    editor.isVoid = (el) => el.type === 'divider' || isVoid(el);

    editor.normalizeNode = (node, opt) => {
      normalizeQuoteNode(editor, node, opt);
      normalizeNode(node, opt);
    };
    return editor;
  }, []);

export const EditorRoot = () => {
  const editor = useEditor();

  const [value, setValue] = useState(mockValues);
  const [draggingElementId, setDraggingElementId] = useState<string>();
  const activeElement = editor.children.find((x) => x.id === draggingElementId);

  const clearSelection = () => {
    ReactEditor.blur(editor);
    Transforms.deselect(editor);
    window.getSelection()?.empty();
  };

  const renderElement = useCallback((props: RenderElementProps) => {
    const isTopLevel = ReactEditor.findPath(editor, props.element).length === 1;

    return isTopLevel ? (
      <SortableElement {...props} renderElement={RenderElement} />
    ) : (
      <RenderElement {...props} />
    );
  }, []);

  const items = useMemo(() => editor.children.map((element) => element.id), [editor.children]);

  const handleDropdownSelect = (type: CommonCustomElementType) => {
    Transforms.insertNodes(editor, createDefaultNode(type), {
      at: [editor.children.length],
    });
  };

  return (
    <DropdownMenu>
      {/* @ts-ignore */}
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <DndContext
          onDragStart={(event) => {
            if (event.active) {
              clearSelection();
              setDraggingElementId(`${event.active.id}`);
            }
          }}
          onDragEnd={(event) => {
            const overId = event.over?.id;
            const overIndex = editor.children.findIndex((x) => x.id === overId);

            if (overId !== draggingElementId && overIndex !== -1) {
              Transforms.moveNodes(editor, {
                at: [],
                match: (node) => node.id === draggingElementId,
                to: [overIndex],
              });
            }

            setDraggingElementId(undefined);
          }}
          onDragCancel={() => {
            setDraggingElementId(undefined);
          }}
          modifiers={[restrictToVerticalAxis]}
          // sensors={sensors}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <HoveringToolbar />
            <Editable
              onKeyDown={(event) => {
                if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
                  event.preventDefault();

                  navigator.clipboard
                    .readText()
                    .then((text) => {
                      if (isImageUrl(text)) {
                        Transforms.insertNodes(
                          editor,
                          createNode({ type: 'imageBlock', url: text }),
                          {
                            at: [editor.children.length],
                          },
                        );
                      }
                    })
                    .catch((err) => {
                      console.error('Failed to paste image:', err);
                    });
                }
              }}
              className="flex flex-col gap-2 p-2 text-gray-100 focus-visible:outline-none focus-visible:[&_*]:outline-none"
              renderElement={renderElement}
              renderLeaf={(props) => <Leaf {...props} />}
              // onDOMBeforeInput={(event) => {
              //   event.preventDefault();
              //   switch (event.inputType) {
              //     case 'formatBold':
              //       return toggleFormat(editor, 'bold');
              //     case 'formatItalic':
              //       return toggleFormat(editor, 'italic');
              //     case 'formatUnderline':
              //       return toggleFormat(editor, 'underlined');
              //     default:
              //       console.log(event.inputType);
              //   }
              // }}
            />
          </SortableContext>
          {createPortal(
            <DragOverlay>
              {activeElement && <DragOverlayContent element={activeElement} />}
            </DragOverlay>,
            document.body,
          )}
        </DndContext>
      </Slate>
      <DropdownMenuPortal>
        <DropdownMenuContent side="right">
          {(
            Object.entries(rootElements) as Array<
              [CommonCustomElementType, EditorRootElementOptions]
            >
          ).map(([type, opt]) => (
            <DropdownMenuItem
              className="gap-2"
              key={type}
              onSelect={() => handleDropdownSelect(type)}
            >
              <opt.icon className="h-4 w-4" />
              <span className="text-sm">{opt.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

const SortableElement = ({ attributes, element, children, renderElement }: any) => {
  const sortable = useSortable({
    id: element.id,
    transition: {
      duration: 350,
      easing: 'ease',
    },
  });

  return (
    <div {...attributes}>
      <div
        className="group/node z-0 flex w-full"
        {...sortable.attributes}
        ref={sortable.setNodeRef}
        style={{
          transition: sortable.transition,
          // @ts-ignore
          '--translate-y': toPx(sortable.transform?.y),
          transform: 'translate3d(0, var(--translate-y, 0), 0)',
          pointerEvents: sortable.isSorting ? 'none' : undefined,
          opacity: sortable.isDragging ? 0 : 1,
        }}
      >
        <CellControls moveProps={sortable.listeners} element={element} />
        <div className="ml-2 w-full">{renderElement({ element, children })}</div>
      </div>
    </div>
  );
};

const DragOverlayContent = ({ element }: any) => {
  const editor = useEditor();
  const [value] = useState([JSON.parse(JSON.stringify(element))]); // clone

  useEffect(() => {
    document.body.classList.add('dragging');

    return () => document.body.classList.remove('dragging');
  }, []);

  return (
    <div className="group/node flex">
      <CellControls moveProps={{}} />
      <Slate editor={editor} initialValue={value}>
        <Editable className="ml-2 w-full" readOnly renderElement={RenderElement} />
      </Slate>
    </div>
  );
};

const toggleFormat = (editor: Editor, format: string) => {
  const isActive = isFormatActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isFormatActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: 'all',
  });
  return !!match;
};

const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: any;
  children: React.ReactNode;
  leaf: any;
}) => {
  let modifiedChildren = children;

  if (leaf.bold) {
    modifiedChildren = <strong>{modifiedChildren}</strong>;
  }

  if (leaf.italic) {
    modifiedChildren = <em>{modifiedChildren}</em>;
  }

  if (leaf.underlined) {
    modifiedChildren = <u>{modifiedChildren}</u>;
  }

  if (leaf.stroke) {
    modifiedChildren = <s>{modifiedChildren}</s>;
  }

  return <span {...attributes}>{modifiedChildren}</span>;
};

const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const [showLinkInput, setShowLinkInput] = useState(false);

  const handleLinkClick = () => {
    setShowLinkInput((prev) => !prev);
  };

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style');
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = '1';
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
  });

  return (
    <Portal>
      <div
        ref={ref}
        className="bg-gray-0 border-gray-10 absolute z-10 gap-1 rounded border p-2 opacity-0 drop-shadow-md transition-opacity"
      >
        {showLinkInput ? (
          <Input
            className="border-gray-30 text-gray-30 h-8 min-w-72 rounded-lg border text-sm max-[900px]:min-w-full"
            autoComplete="off"
            type="url"
            placeholder="Вставьте ссылку"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const url = (e.target as HTMLInputElement).value;
                if (!url) return;
                insertLink(editor, url);
                setShowLinkInput(false);
              }
            }}
          />
        ) : (
          <>
            <FormatButton
              format="bold"
              icon={<Bold className="group-hover:fill-brand-100 h-4 w-4 fill-gray-100" />}
            />
            <FormatButton
              format="italic"
              icon={<Italic className="group-hover:fill-brand-100 h-4 w-4 fill-gray-100" />}
            />
            <FormatButton
              format="underlined"
              icon={<Underline className="group-hover:fill-brand-100 h-4 w-4 fill-gray-100" />}
            />
            <FormatButton
              format="stroke"
              icon={<Stroke className="group-hover:fill-brand-100 h-4 w-4 fill-gray-100" />}
            />
            <FormatButton
              onClick={handleLinkClick}
              format="link"
              icon={<Link className="group-hover:fill-brand-100 h-4 w-4 fill-gray-100" />}
            />
          </>
        )}
      </div>
    </Portal>
  );
};

const FormatButton = ({
  format,
  icon,
  onClick,
}: {
  format: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) => {
  const editor = useSlate();
  // const isActive = isFormatActive(editor, format);

  return (
    <Button
      className="bg-gray-0 hover:bg-brand-0 hover:fill-brand-100 group h-6 w-6 rounded-sm p-0"
      // active={isActive ? 'true' : undefined}
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
      {icon}
    </Button>
  );
};

const withInlines = (editor: Editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => ['link'].includes(element.type) || isInline(element);

  editor.insertText = (text: string) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data: DataTransfer) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    url,
    children: [{ text: '', id: makeNodeId() }],
    id: makeNodeId(),
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};

const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
  return !!link;
};
