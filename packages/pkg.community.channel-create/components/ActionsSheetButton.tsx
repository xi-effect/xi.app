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
      className="border-gray-40 border border-solid p-4 rounded-lg bg-transparent flex flex-row gap-4"
    >
      <div className="py-0.5">
        <Icon className="fill-gray-100" />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-start gap-1">
          <h3 className="text-gray-100 text-[20px] font-medium leading-7">{title}</h3>
          <p className="leading-5">{desctiption}</p>
        </div>
        <div>
          <div className={`w-6 h-6 rounded-full bg-transparent ${сlassName}`}></div>
        </div>
      </div>
    </button>
  );
}
