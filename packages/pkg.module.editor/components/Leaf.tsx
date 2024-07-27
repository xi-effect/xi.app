import React from 'react';

export const Leaf = ({
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
