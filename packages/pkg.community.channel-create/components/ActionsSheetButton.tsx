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
      type="button"
      onClick={() => onClick(index)}
      className="border-gray-40 hover:bg-gray-5 flex gap-4 rounded-lg border border-solid bg-transparent p-4"
    >
      <div className="py-0.5">
        <Icon className="fill-gray-100" />
      </div>
      <div className="flex items-center gap-4">
        <div className="space-y-1 text-start">
          <h3 className="text-[20px] font-medium leading-[28px] text-gray-100">{title}</h3>
          <p className="text-gray-80 text-[16px] font-normal leading-[22px]">{desctiption}</p>
        </div>
        <div>
          <div className={`size-6 rounded-full bg-transparent ${сlassName}`} />
        </div>
      </div>
    </button>
  );
}
