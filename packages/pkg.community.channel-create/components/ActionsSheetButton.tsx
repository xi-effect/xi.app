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
      className="border-[#9F9F9F] border-[1px] border-solid p-4 rounded-lg bg-transparent flex flex-row gap-4"
    >
      <div className="py-0.5">
        <Icon className="fill-[#101010]" />
      </div>
      <div className="flex flex-row  items-center gap-4">
        <div className="flex flex-col items-start text-start ">
          <h3 className="text-[#101010] text-[20px] font-medium leading-7	">{title}</h3>
          <p className="leading-5">{desctiption}</p>
        </div>
        <div>
          <div className={`w-6 h-6 rounded-full bg-transparent ${сlassName}`}></div>
        </div>
      </div>
    </button>
  );
}
