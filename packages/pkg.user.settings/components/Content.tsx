import React from 'react';
import { Main } from './Main';
import { PersonalData } from './PersonalData';
import { Secure } from './Secure';

type ContentPropsT = {
    activeContent: number;
};

export const Content = ({ activeContent }: ContentPropsT) => {
    const contentItems = [<Main />, <PersonalData />, <Secure />];

    return <div className="ml-8 w-full">{contentItems[activeContent]}</div>;
};
