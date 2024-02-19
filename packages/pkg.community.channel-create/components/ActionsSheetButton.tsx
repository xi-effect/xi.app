import React from 'react';

interface ActionsSheetButtonT {
  Icon: React.ComponentType<any>;
  title: string;
  desctiption: string;
  index: number;
  onClick: (index: number) => void;
  сlassName: string;
}

export function ActionsSheetButton({
  Icon,
  title,
  desctiption,
  сlassName,
  index,
  onClick,
}: ActionsSheetButtonT) {
  return (
    <button
      onClick={() => onClick(index)}
      className="border-gray-40 border border-solid p-4 rounded-lg bg-transparent flex gap-4 hover:bg-gray-5"
    >
      <div className="py-0.5">
        <Icon className="fill-gray-100" />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-start space-y-1">
          <h3 className="text-gray-100 text-[20px] font-medium leading-7">{title}</h3>
          <p className="text-gray-80 text-[16px] font-normal leading-5">{desctiption}</p>
        </div>
        <div>
          <div className={`size-6 rounded-full bg-transparent ${сlassName}`}></div>
        </div>
      </div>
    </button>
  );
}
