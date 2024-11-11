import React from 'react';

type MessageItemT = {
  id: string;
  name: string;
  time: string;
  message: string;
};

type DateMessageProps = {
  index: number;
  mocksMessages: MessageItemT[];
  time: string;
};

export const DateChat: React.FC<DateMessageProps> = ({ index, mocksMessages, time }) => {
  const shouldShowDate = (index: number, messages: MessageItemT[]) => {
    const dateFiltering =
      index === 0 || formatDate(messages[index].time) !== formatDate(messages[index - 1].time);
    return dateFiltering;
  };

  const formatDate = (dateString: string) => {
    const [datePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('.');
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    const dateFormat = date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });

    return dateFormat;
  };

  return (
    <div>
      {shouldShowDate(index, mocksMessages) && (
        <div className="flex w-full justify-center p-2">
          <span className="bg-gray-5 text-gray-70 rounded-lg px-2 py-1">{formatDate(time)}</span>
        </div>
      )}
    </div>
  );
};
