import React from 'react';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Content } from './components/Content';
import { useMedia } from 'pkg.utils';

export const UserSettings = () => {
    const [activeContent, setActiveContent] = React.useState(0);

    const isTablet = useMedia('(max-width: 960px)');

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1132px] h-full min-h-full flex flex-col">
                <Header />
                <div className="flex flex-row mt-4">
                    <Menu activeContent={activeContent} setActiveContent={setActiveContent} />
                    <Content activeContent={activeContent} />
                </div>
            </div>
        </div>
    );
};
