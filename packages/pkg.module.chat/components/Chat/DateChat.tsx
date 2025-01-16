import React from 'react';
import { MessageT } from '../../models/Message';
import { formatDate } from '../../utils';

type DateMessageProps = {
  itemCreatedAt: MessageT['createdAt'];
};

export const DateChat = ({ itemCreatedAt }: DateMessageProps) => (
  <div>
    <div className="flex w-full justify-center p-2">
      <span className="bg-gray-5 text-gray-70 rounded-lg px-2 py-1">
        {itemCreatedAt && formatDate(itemCreatedAt)}
      </span>
    </div>
  </div>
);
