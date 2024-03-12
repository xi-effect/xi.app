import React from 'react';
import { Main } from './Main';
import { PersonalData } from './PersonalData';
import { Customization } from './Customization';
import { Secure } from './Secure';
import { UserT } from 'pkg.models';

type ContentPropsT = {
  activeContent: number;
};

export const Content = ({ activeContent }: ContentPropsT) => {
  const contentItems = [<Main />, <PersonalData />, <Customization />, <Secure />];

  return <div className="w-full sm:ml-8">{contentItems[activeContent]}</div>;
};
