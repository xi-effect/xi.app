import React from 'react';
import { MessageT } from '../../models/Message';
import { areDatesDifferent, formatDate } from '../../utils';

// type MessageItemT = {
//   id: string;
//   name: string;
//   time: string;
//   message: string;
// };

type DateMessageProps = {
  itemCreatedAt: MessageT['createdAt'];
  prevItemCreatedAt: MessageT['createdAt'];
};

export const DateChat = ({ itemCreatedAt, prevItemCreatedAt }: DateMessageProps) => {
  if (itemCreatedAt && prevItemCreatedAt && !areDatesDifferent(itemCreatedAt, prevItemCreatedAt)) {
    return null;
  }

  return (
    <div>
      <div className="flex w-full justify-center p-2">
        <span className="bg-gray-5 text-gray-70 rounded-lg px-2 py-1">
          {itemCreatedAt && formatDate(itemCreatedAt)}
        </span>
      </div>
    </div>
  );
};
