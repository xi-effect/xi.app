import React from 'react';
import { Form, useForm } from '@xipkg/form';
import { Main } from './Main';
import { PersonalData } from './PersonalData';
import { Customization } from './Customization';
import { Secure } from './Secure';

type ContentPropsT = {
  activeContent: number;
};
const contentItems = [<Main />, <PersonalData />, <Customization />, <Secure />];

export const Content = ({ activeContent }: ContentPropsT) => {
  const form = useForm();

  return (
    <div className="h-full w-full sm:ml-8">
      <Form {...form}>{contentItems[activeContent]}</Form>
    </div>
  );
};
