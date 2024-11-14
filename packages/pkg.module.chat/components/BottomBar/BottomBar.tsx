import React from 'react';
import { SubmitButton } from './SubmitButton';
import { Field } from './Field';

export const BottomBar = () => {
  console.log('BottomBar');

  return (
    <div className="flex min-h-[96px] w-full grow-0 items-end gap-4 p-4 pb-8">
      <Field />
      <SubmitButton />
    </div>
  );
};
