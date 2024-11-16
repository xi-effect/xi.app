import React from 'react';
import { Button } from '@xipkg/button';
import { Send } from '@xipkg/icons';

export const SubmitButton = () => {
  console.log('BottomBar');

  return (
    <Button size="m" className="h-12 w-12 min-w-12 p-0">
      <Send className="fill-gray-0 h-6 w-6" />
    </Button>
  );
};
