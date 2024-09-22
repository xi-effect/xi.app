import { get } from 'pkg.utils';
import { UserT } from 'pkg.models';

export type ResponseBodyUserT = {
  id: UserT['id'];
  username: UserT['username'];
  display_name: UserT['displayName'];
  onboarding_stage: UserT['onboardingStage'];
  theme: UserT['theme'];
  email: UserT['email'];
  last_password_change: UserT['last_password_change'];
};

export const getUser = async () => {
  const { data, status } = await get<ResponseBodyUserT>({
    service: 'auth',
    path: '/api/users/current/home/',
    config: {
      headers: {
        'Content-Type': 'application/json',
        'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING
          ? process.env.NEXT_PUBLIC_ENABLE_X_TESTING
          : 'false',
      },
    },
  });

  return { data, status };
};
