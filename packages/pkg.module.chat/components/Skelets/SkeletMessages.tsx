import React from 'react';
import { SkeletMessage } from './SkeletMessage';

type SkeletMessagesPropsT = {
  length?: number;
  withoutLayout?: boolean;
};

export const SkeletMessages = ({ length, withoutLayout = false }: SkeletMessagesPropsT) => {
  if (withoutLayout) {
    return (
      <>
        {[...new Array(length ?? 10)].map((_, index) => (
          <SkeletMessage key={index.toString()} />
        ))}
      </>
    );
  }

  return (
    <div className="flex-1 overflow-hidden p-4">
      <ul className="block p-2">
        {[...new Array(length ?? 10)].map((_, index) => (
          <SkeletMessage key={index.toString()} />
        ))}
      </ul>
    </div>
  );
};
