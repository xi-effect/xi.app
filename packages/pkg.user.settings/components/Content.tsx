import React, { ReactElement } from 'react';
import { Main } from './Main';
import { Customization } from './Customization';
import { Secure } from './Secure';
import { PersonalData } from './PersonalData';

type ComponentMapT = {
  [key: string]: ReactElement;
}

const componentMap: ComponentMapT = {
  home: <Main />,
  personalInfo: <PersonalData />,
  personalisation: <Customization />,
  security: <Secure />,
};

type ContentPropsT = {
  activeQuery: string;
};

export const Content = ({ activeQuery }: ContentPropsT) => {
  const activeItem = componentMap[activeQuery] || <Main />;
  return <div className="w-full sm:ml-8">{activeItem}</div>;
};
