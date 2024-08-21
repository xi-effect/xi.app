import { ReactEditor, useSlate } from 'slate-react';
import { Node, Transforms } from 'slate';
import { useState } from 'react';
import { DEFAULT_LANGUAGE } from '../const/codeEditorLanguages';

export const useCodeLanguage = () => {
  const editor = useSlate();
  const [currentLang, setCurrentLang] = useState(DEFAULT_LANGUAGE);

  const updateLanguage = (element: Node, newLanguage: string) => {
    setCurrentLang(newLanguage);
    const path = ReactEditor.findPath(editor as ReactEditor, element);
    Transforms.setNodes(editor, { language: newLanguage } as Partial<Node>, { at: path });
  };

  return {
    currentLang,
    setLanguage: updateLanguage,
  };
};
