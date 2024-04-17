/* eslint-disable react/jsx-no-useless-fragment */
import { RenderElementProps } from 'slate-react';

const renderElement = ({ element, attributes, children }: RenderElementProps) => {
  switch (element.type) {
    case 'paragraph':
    case 'heading1':
    case 'heading2':
    case 'heading3':
      return (
        <div
          className={
            (
              {
                paragraph: 'text-xl',
                heading1: 'text-4xl',
                heading2: 'text-3xl',
                heading3: 'text-2xl',
              } as const
            )[element.type]
          }
          {...attributes}
        >
          {children}
        </div>
      );
    case 'bulleted-list':
      return (
        <ul className="list-disc pl-4" {...attributes}>
          {children}
        </ul>
      );
    case 'numbered-list':
      return (
        <ol className="list-decimal pl-4" {...attributes}>
          {children}
        </ol>
      );
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'quote':
      return (
        <div className="border-gray-80 space-y-2 border-l-4 px-5 py-4" {...attributes}>
          {children}
        </div>
      );
    case 'tip':
      return (
        <div className="bg-green-0 space-y-2 rounded-lg p-4" {...attributes}>
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
    case 'image':
      return <img alt="" src={element.url} />;
    default:
      console.warn('Unknown element type', element);
      return <></>;
  }
};

export default renderElement;
