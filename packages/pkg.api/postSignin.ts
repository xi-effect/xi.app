import { post } from 'pkg.utils';
import { ResponseBodyUserT } from './getUser';

type PostSigninT = {
    email: string;
    password: string;
}

type RequestBodySignIn = {
    email: string;
    password: string;
};

type ResponseBodySignIn = {
    detail: string;
} & ResponseBodyUserT;

export const postSignin = async ({ email, password }: PostSigninT) => {
    const { data, status } = await post<RequestBodySignIn, ResponseBodySignIn>({
        service: 'auth',
        path: '/api/signin/',
        body: {
            email: email.toLowerCase(),
            password: password.trim().toString(),
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
}