import React from 'react';
import { CustomEditor } from '@xipkg/inputsmart';
import { SubmitButton } from './SubmitButton';
import { Field } from './Field';

export const BottomBar = () => {
  const editorRef = React.useRef<CustomEditor | null>(null);

  return (
    <div className="flex min-h-[96px] w-full grow-0 items-end gap-4 p-4 pb-8">
      <Field />
      <SubmitButton editorRef={editorRef} />
    </div>
  );
};
