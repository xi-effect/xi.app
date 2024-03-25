import { ReadonlyURLSearchParams } from 'next/navigation';

export const createQueryString = (searchParams: ReadonlyURLSearchParams,
                                  name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
};
