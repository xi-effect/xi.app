import { ReactEditor, useSlate } from 'slate-react';
import { Node, Transforms } from 'slate';
import { useCodeEditorLang } from '../interfaceStore';

export const useCodeLanguage = () => {
  const editor = useSlate();
  const { currentLang, setNewLang } = useCodeEditorLang();

  const updateLanguage = (element: Node, newLanguage: string) => {
    setNewLang(newLanguage);
    const path = ReactEditor.findPath(editor as ReactEditor, element);
    Transforms.setNodes(editor, { language: newLanguage } as Partial<Node>, { at: path });
  };

  return {
    currentLang,
    setLanguage: updateLanguage,
  };
};
