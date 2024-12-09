import React from 'react';
import { CustomEditor, SmartInput } from '@xipkg/inputsmart';
import { useLocalStorage } from 'pkg.utils.client';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

type FieldPropsT = {
  storageKey: string;
  editorRef: React.MutableRefObject<CustomEditor | null>;
};

export const Field = ({ editorRef, storageKey }: FieldPropsT) => {
  const [value, setValue] = useLocalStorage(storageKey, initialValue);

  React.useEffect(() => {
    if (value) {
      editorRef.current?.setContent(value);
    }
  }, [storageKey]);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className="border-gray-30 box-border h-full max-h-32 min-h-12 w-full max-w-[calc(100%-64px)] overflow-auto rounded-lg border-2 p-2">
      <SmartInput
        editorRef={editorRef}
        initialValue={initialValue}
        onChange={handleChange}
        editableProps={{
          placeholder: 'Напишите что‑нибудь…',
        }}
        editableClassName="mt-0.5"
      />
    </div>
  );
};
