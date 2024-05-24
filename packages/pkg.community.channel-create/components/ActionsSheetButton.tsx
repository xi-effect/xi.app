import React from 'react';

interface ActionsSheetButtonT {
  Icon: React.ComponentType<any>;
  title: string;
  desctiption: string;
  index: number;
  onClick: (index: number) => void;
  сlassName: string;
  disabled?: boolean;
}

export function ActionsSheetButton({
  Icon,
  title,
  desctiption,
  сlassName,
  disabled = false,
  index,
  onClick,
}: ActionsSheetButtonT) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onClick(index)}
      className={`${disabled ? 'border-gray-20 hover:bg-gray-0 hover:cursor-not-allowed' : 'border-gray-40 hover:bg-gray-5'} flex gap-4 rounded-lg border border-solid bg-transparent p-4`}
    >
      <div className="py-0.5">
        <Icon className={disabled ? 'fill-gray-40' : 'fill-gray-100'} />
      </div>
      <div className="flex items-center gap-4">
        <div className="space-y-1 text-start">
          <h3
            className={`text-[20px] font-medium leading-[28px] ${disabled ? 'text-gray-40' : 'text-gray-100'}`}
          >
            {title}
          </h3>
          <p
            className={`text-[16px] font-normal leading-[22px] ${disabled ? 'text-gray-20' : 'text-gray-80'}`}
          >
            {desctiption}
          </p>
        </div>
        <div>
          <div className={`size-6 rounded-full ${disabled ? 'bg-gray-20' : сlassName}`} />
        </div>
      </div>
    </button>
  );
}
