/* eslint-disable no-undef */
type ServicesT = 'backend' | 'auth' | 'live';

type ServicesMapT = {
  [key in ServicesT]: string;
};

type GetT = {
  service: ServicesT;
  path: string;
  config?: RequestInit;
};

type PostT<T> = GetT & { body: T };
type PutT<T> = GetT & { body: T };
type DelT = GetT;

const servicesMap: ServicesMapT = {
  backend: process.env.NEXT_PUBLIC_SERVER_URL_BACKEND ?? '',
  auth: process.env.NEXT_PUBLIC_SERVER_URL_AUTH ?? '',
  live: process.env.NEXT_PUBLIC_SERVER_URL_LIVE ?? '',
};

async function http<T>(
  service: ServicesT,
  path: string,
  configInit: RequestInit,
): Promise<{ data: T; status: number }> {
  const url = `${servicesMap[service]}${path}`;

  const config: RequestInit = {
    ...configInit,
    credentials: 'include',
    headers: {
      ...configInit.headers,
    },
  };

  const request = new Request(url, config);

  const response = await fetch(request);
  const data = await response.json().catch(() => ({}));

  return { data, status: response.status };
}

export async function get<T>({ service, path, config }: GetT) {
  const init = { method: 'GET', ...config };
  const { data, status } = await http<T>(service, path, init);

  return { status, data };
}

export async function post<T, U>({ service, path, body, config }: PostT<T>) {
  const init = {
    method: 'POST',
    body: body instanceof FormData ? body : JSON.stringify(body),
    ...config,
  };

  const { data, status } = await http<U>(service, path, init as RequestInit);

  return { status, data };
}

export async function patch<T, U>({ service, path, body, config }: PostT<T>) {
  const init = {
    method: 'PATCH',
    body: body instanceof FormData ? body : JSON.stringify(body),
    ...config,
  };

  const { data, status } = await http<U>(service, path, init as RequestInit);

  return { status, data };
}

export async function put<T, U>({ service, path, body, config }: PutT<T>) {
  const init = {
    method: 'PUT',
    body: body instanceof FormData ? body : JSON.stringify(body),
    ...config,
  };
  const { data, status } = await http<U>(service, path, init as RequestInit);

  return { status, data };
}

export async function del<T>({ service, path, config }: DelT) {
  const init = { method: 'DELETE', ...config };
  const { data, status } = await http<T>(service, path, init as RequestInit);

  return { status, data };
}
