import React from 'react';
import { SkeletMessage } from './SkeletMessage';

type SkeletMessagesPropsT = {
  length?: number;
};

export const SkeletMessages = ({ length }: SkeletMessagesPropsT) => (
  <div className="flex-1 overflow-y-auto p-4">
    <ul className="block p-2">
      {[...new Array(length ?? 10)].map(() => (
        <SkeletMessage />
      ))}
    </ul>
  </div>
);
