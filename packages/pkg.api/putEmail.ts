import { put } from 'pkg.utils';
import { ResponseBodyUserT } from './getUser';

type PutEmailT = {
    email: string;
    password: string;
};

type RequestBodyChangeEmail = {
    detail: string;
} & ResponseBodyUserT;

type ResponseBodyChangeEmail = {
    new_email: string;
    password: string;
};

export const putEmail = async ({ email, password }: PutEmailT) => {
    const { data, status } = await put<ResponseBodyChangeEmail, RequestBodyChangeEmail>({
        service: 'auth',
        path: '/api/users/current/email/',
        body: {
            new_email: email.toLowerCase(),
            password: password.trim().toString(),
        },
        config: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });

    return { data, status };
}