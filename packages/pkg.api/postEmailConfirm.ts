import { post } from 'pkg.utils';

export const postEmailConfirm = async (token: string) => {
  const decodedToken = decodeURIComponent(token);
  const { status } = await post({
    service: 'auth',
    path: '/api/email-confirmation/confirmations/',
    body: { token: decodedToken },
    config: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  return { status };
};
