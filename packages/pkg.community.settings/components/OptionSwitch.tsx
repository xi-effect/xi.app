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

const OptionSwitch = (props: OptionSwitchProps) => {
  const [checked, setChecked] = useState(props.initialChecked);

  return (
    <button
      onClick={() => {
        setChecked((p) => {
          props.onChange(!p);
          return !p;
        });
      }}
      className={cn('flex bg-transparent w-full justify-between py-4', props.className)}
    >
      <div className="space-y-2 text-start">
        <h5 className="font-medium">{props.title}</h5>
        <p className="text-sm">{props.description}</p>
      </div>
      <Toggle className="mb-auto" checked={checked}></Toggle>
    </button>
  );
};

export default OptionSwitch;
