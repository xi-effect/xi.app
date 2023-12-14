'use client';
import { ReactNode } from 'react';
import { CommunityItems, CommunityMenu, BottomBar, Menu } from './components';

import { useMedia } from 'pkg.utils';
import Image from 'next/image';

type NavigationProp = {
    children: ReactNode;
};

export const Navigation = ({ children }: NavigationProp) => {
    const isMobile = useMedia('(max-width: 480px)');
    const isTablet = useMedia('(max-width: 960px)');

    console.log('Navigation');

    if (isTablet) return <BottomBar>{children}</BottomBar>;

    return (
        <div className="relative flex flex-row">
            <div className="fixed flex flex-col p-6 h-screen min-h-screen min-w-[350px]">
                <Menu />
            </div>
            <div className="ml-[350px]">{children}</div>
        </div>
    );
};
