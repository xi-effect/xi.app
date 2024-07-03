'use client';

import { redirect } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import { useEffect } from 'react';

// const welcomePagesPathsDict = {
//   created: '/welcome/user-info',
//   'community-choice': '/welcome/community',
//   'community-create': '/welcome/community-create',
//   'community-invite': '/welcome/community-invite',
// };

const WelcomeLayout = ({ children }) => {
  const onboardingStage = useMainSt((state) => state.user.onboardingStage);

  useEffect(() => {
    if (onboardingStage !== 'completed') {
      redirect('/welcome/user-info');
    }
  }, []);

  return children;
};

export default WelcomeLayout;
