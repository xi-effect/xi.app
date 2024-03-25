/* eslint-disable no-param-reassign */

import { Element } from 'slate';
import { nanoid } from 'nanoid';

export const makeNodeId = () => nanoid(16);

export const assignIdRecursively = (node: any) => {
    if (Element.isElement(node)) {
        // @ts-ignore
        node.id = makeNodeId();
        node.children.forEach(assignIdRecursively);
    }
};

export const withNodeId = (editor: any) => {
    const { apply } = editor;

    editor.apply = (operation: any) => {
        if (operation.type === 'insert_node') {
            assignIdRecursively(operation.node);
            return apply(operation);
        }

        if (operation.type === 'split_node') {
            operation.properties.id = makeNodeId();
            return apply(operation);
        }

        return apply(operation);
    };

    return editor;
};
