import React from 'react';
import { Toggle } from '@xipkg/toggle';

interface PrivateCategoryToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const PrivateCategoryToggle = ({ checked, onChange }: PrivateCategoryToggleProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newChecked = event.currentTarget.dataset.state === 'checked';
    onChange(!newChecked);
  };

  return (
    <div className="bg-gray-5 rounded-[8px] p-4">
      <div className="flex justify-between">
        <div>
          <p className="text-l-base">Приватная категория</p>
          <p className="text-s-base text-gray-80">
            Контент в данной категории будет доступен только выбранным классам и ролям
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Toggle checked={checked} onClick={handleClick} size="l" id="private-category" />
        </div>
      </div>
    </div>
  );
};
