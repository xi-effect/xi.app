import React from 'react';
import { SmartInput } from '@xipkg/inputsmart';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export const Field = () => {
  const handleChange = () => {};

  return (
    <div className="border-gray-30 box-border h-full max-h-32 min-h-12 w-full max-w-[calc(100%-64px)] overflow-auto rounded-lg border-2 p-2">
      <SmartInput
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
