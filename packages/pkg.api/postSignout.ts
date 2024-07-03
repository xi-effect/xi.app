import { post } from 'pkg.utils';

export const postSignout = async () => {
  const { data, status } = await post({
    service: 'auth',
    path: '/api/signout/',
    body: {},
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
