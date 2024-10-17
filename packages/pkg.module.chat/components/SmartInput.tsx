import React from 'react';

export const SmartInput = () => {
  console.log('SmartInput');

  return (
    <div className="bg-gray-0 bottom-0 flex h-[80px] w-full p-4">
      <input
        type="text"
        placeholder="Напишите что-нибудь..."
        className="mr-2 w-full rounded-lg border p-2"
      />
      <button type="button" className="rounded-lg bg-blue-500 p-2 text-white">
        Отправить
      </button>
    </div>
  );
};
