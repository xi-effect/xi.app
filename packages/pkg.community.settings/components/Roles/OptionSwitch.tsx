import { Toggle } from '@xipkg/toggle';
import { cn } from '@xipkg/utils';
import { useState } from 'react';

interface OptionSwitchProps {
  initialChecked?: boolean;
  onChange: (checked: boolean) => void;
  title: string;
  description: string;
  className?: string;
}

const OptionSwitch = ({
  description,
  onChange,
  title,
  className,
  initialChecked,
}: OptionSwitchProps) => {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <button
      type="button"
      onClick={() => {
        setChecked((p) => {
          onChange(!p);
          return !p;
        });
      }}
      className={cn('flex w-full justify-between bg-transparent py-4', className)}
    >
      <div className="space-y-2 text-start">
        <h5 className="font-medium">{title}</h5>
        <p className="break-all text-sm">{description}</p>
      </div>
      <Toggle className="mb-auto" checked={checked} />
    </button>
  );
};

export default OptionSwitch;
