import React from 'react';
import { RenderLeafProps } from 'slate-react';

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
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

  if (children.props.parent.type && children.props.parent.type === 'code') {
    return (
      <span {...attributes} className={`token ${leaf.token}`}>
        {modifiedChildren}
      </span>
    );
  }

  return <span {...attributes}>{modifiedChildren}</span>;
};
