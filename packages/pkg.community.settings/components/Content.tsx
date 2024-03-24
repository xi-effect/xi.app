import React from 'react';
import { Main } from './Main';
import { PersonalData } from './PersonalData';
import { Customization } from './Customization';
import { Secure } from './Secure';
import { Users } from './Users';

type ContentPropsT = {
  activeContent: number;
};

const contentItems = [<Main />, <PersonalData />, <Customization />, <Users />, <Secure />];

export const Content = ({ activeContent }: ContentPropsT) => (
  <div className="w-full sm:ml-8">{contentItems[activeContent]}</div>
);
