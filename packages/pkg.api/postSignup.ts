import { post } from 'pkg.utils';
import { ResponseBodyUserT } from './getUser';

type PostSignupT = {
  email: string;
  password: string;
  username: string;
};

type RequestBodySignUp = {
  username: string;
  email: string;
  password: string;
};

type ResponseBodySignUp = {
  detail: string;
} & ResponseBodyUserT;

export const postSignup = async ({ email, password, username }: PostSignupT) => {
  const { data, status } = await post<RequestBodySignUp, ResponseBodySignUp>({
    service: 'auth',
    path: '/api/signup/',
    body: {
      email: email.toLowerCase(),
      password: password.trim().toString(),
      username,
    },
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
