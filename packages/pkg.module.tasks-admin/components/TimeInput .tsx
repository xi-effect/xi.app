import React from 'react';
import { Input } from '@xipkg/input';

type TimeInputPropsT = {
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
};

const allowedKeys = [
  'Backspace',
  'Delete',
  'Tab',
  'Escape',
  'Enter',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  ':',
];

export const TimeInput = ({ time = '', setTime }: TimeInputPropsT) => {
  const checkNum = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (allowedKeys.includes(e.key) || (e.key === 'a' && (e.ctrlKey || e.metaKey))) {
      return;
    }
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const formatHHMM = (e: React.FocusEvent<HTMLInputElement>) => {
    let str = e.target.value.replace(':', '');

    if (str === '') {
      setTime('');
      return;
    }

    if (str.length > 2) {
      str = `0${str}`.slice(-4);
    } else {
      str = `0${str}00`.slice(-4);
    }

    let mm = parseInt(str.slice(2, 4), 10);
    let hh = parseInt(str.slice(0, 2), 10);

    if (mm > 59) {
      mm -= 60;
    }
    if (hh > 23) {
      hh %= 24;
    }

    const formatted = `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
    setTime(formatted);
  };

  return (
    <Input
      className="w-[100px] flex-auto"
      // Пользователь может ввести 4 числа, или 4 числа и ":"
      maxLength={5}
      placeholder="__:__"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      onKeyDown={checkNum}
      onBlur={formatHHMM}
    />
  );
};
