import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { SubmitButton } from './SubmitButton';
import { Field } from './Field';
import { CustomEditorSI } from '../../type';

export const BottomBar = () => {
  const editorRef = React.useRef<CustomEditorSI | null>(null);

  const params = useParams<{ 'community-id': string; 'channel-id': string }>();
  const storageKey = useMemo(
    () => `chat-${params['community-id']}-${params['channel-id']}`,
    [params['channel-id'], params['community-id']],
  );

  return (
    <div className="flex min-h-[96px] w-full grow-0 items-end gap-4 p-4 pb-8">
      <Field storageKey={storageKey} editorRef={editorRef} />
      <SubmitButton storageKey={storageKey} editorRef={editorRef} />
    </div>
  );
};
