import { ReadonlyURLSearchParams } from 'next/navigation';

interface IDeleteQuery {
    [key: string]: string
}

export const deleteQuery = (searchParams: ReadonlyURLSearchParams | IDeleteQuery
    | string, name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);
    return params.toString();
};
