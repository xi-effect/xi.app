'use client';

import { redirect, usePathname } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import { useEffect } from 'react';

const welcomePagesPathsDict = {
  created: '/welcome/user-info',
  'community-choice': '/welcome/community',
  'community-create': '/welcome/community-create',
  'community-invite': '/welcome/community-invite',
};

const WelcomeLayout = ({ children }) => {
  const onboardingStage = useMainSt((state) => state.user.onboardingStage);
  const pathname = usePathname();

  useEffect(() => {
    if (
      onboardingStage !== 'completed' &&
      onboardingStage !== null &&
      welcomePagesPathsDict[onboardingStage] !== pathname
    ) {
      redirect(welcomePagesPathsDict[onboardingStage]);
    }
  }, []);

  return children;
};

export default WelcomeLayout;
