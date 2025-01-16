/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { SmartInput } from '@xipkg/inputsmart';
import { useLocalStorage } from 'pkg.utils.client';
import { CustomEditorSI } from '../../type';

const initialValue: any = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

type FieldPropsT = {
  storageKey: string;
  editorRef: React.RefObject<CustomEditorSI | null>;
};

export const Field = ({ editorRef, storageKey }: FieldPropsT) => {
  const [value, setValue] = useLocalStorage(storageKey, initialValue);
  const [isPlaceholder, setIsPlaceholder] = React.useState(true);

  React.useEffect(() => {
    if (value) {
      editorRef.current?.setContent(value);
    }
  }, [storageKey]);

  const handleChange = (newValue: any) => {
    setValue(newValue);

    if (
      newValue[0].children[0].text.length === 0 &&
      newValue.length === 1 &&
      newValue[0].children.length === 1
    ) {
      setIsPlaceholder(true);
    } else {
      setIsPlaceholder(false);
    }
  };

  return (
    <div className="border-gray-30 relative box-border h-full max-h-32 min-h-12 w-full max-w-[calc(100%-64px)] overflow-auto rounded-lg border-2 p-2">
      <div className="">
        <SmartInput
          editorRef={editorRef}
          initialValue={initialValue}
          onChange={handleChange}
          editableClassName="mt-0.5"
        />
        {isPlaceholder && (
          <span className="text-gray-30 pointer-events-none absolute inset-y-0 left-2 flex items-center">
            {' '}
            Напишите что‑нибудь…{' '}
          </span>
        )}
      </div>
    </div>
  );
};
