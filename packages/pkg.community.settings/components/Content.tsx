import React from 'react';
import { Main } from './Main';
import { PersonalData } from './PersonalData';
import { Customization } from './Customization';
import { Secure } from './Secure';

type ContentPropsT = {
    activeContent: number;
};

export const Content = ({ activeContent }: ContentPropsT) => {
    const contentItems = [<Main />, <PersonalData />, <Customization />, <Secure />];

    return <div className="sm:ml-8 w-full">{contentItems[activeContent]}</div>;
};
