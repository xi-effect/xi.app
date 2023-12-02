import React from 'react';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Content } from './components/Content';

export const UserSettings = () => {
  const [activeContent, setActiveContent] = React.useState(0);

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full max-w-[1132px] h-full min-h-full flex flex-col">
        <Header />
        <div className="flex flex-row">
          <Menu activeContent={activeContent} setActiveContent={setActiveContent} />
          <Content />
        </div>
      </div>
    </div>
  );
};
