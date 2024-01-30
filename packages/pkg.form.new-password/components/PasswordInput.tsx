import { Eyeoff, Eyeon } from '@xipkg/icons';
import { Input } from '@xipkg/input';
import { ComponentProps, useState } from 'react';

interface PasswordInputProps extends ComponentProps<typeof Input> {}

const PasswordInput = (props: PasswordInputProps) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  return (
    <Input
      {...props}
      autoComplete="on"
      type={isPasswordShow ? 'text' : 'password'}
      afterClassName="cursor-pointer"
      after={
        isPasswordShow ? <Eyeoff className="fill-gray-60" /> : <Eyeon className="fill-gray-60" />
      }
      afterProps={{
        onClick: () => setIsPasswordShow((p) => !p),
      }}
    />
  );
};

export default PasswordInput;
