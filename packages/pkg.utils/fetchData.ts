import { redirect } from 'next/navigation';

type MethodT = 'GET' | 'PUT' | 'POST' | 'DELETE';

type ServicesMapT = {
  [key in 'backend' | 'auth' | 'live']: string;
};

const servicesMap: ServicesMapT = {
  backend: process.env.NEXT_PUBLIC_SERVER_URL_BACKEND ?? '',
  auth: process.env.NEXT_PUBLIC_SERVER_URL_AUTH ?? '',
  live: process.env.NEXT_PUBLIC_SERVER_URL_LIVE ?? '',
};

type FetchDataT = {
  service: 'backend' | 'auth' | 'live';
  pathname: string;
  method: MethodT;
  data?: unknown;
  domain?: string;
  headers?: { [key: string]: string };
};

console.log('process.env.ENABLE_X_TESTING', process.env.ENABLE_X_TESTING);

export const fetchData = async ({
  service,
  pathname,
  method,
  data,
  domain,
  headers,
}: FetchDataT) => {
  const url = `${servicesMap[service] ?? domain}${pathname}`;

  try {
    let response: null | Response = null;
    if (data != null) {
      response = await fetch(url, {
        method,
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
      });
    }
    if (data == null) {
      response = await fetch(url, {
        method,
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
    }
    // if (response?.status === 401 || response?.status === 403 || response?.status === 422) {
    //   redirect('/signin');
    // }
    if (response?.ok) {
      const string = await response?.text();
      const json = string === '' ? {} : JSON.parse(string);
      return json;
    }
  } catch (error: unknown) {
    if (typeof error === 'string') {
      console.warn('Возникла проблема с вашим fetch запросом: ', error);
    } else if (error instanceof Error) {
      console.warn('Возникла проблема с вашим fetch запросом: ', error.message);
    }
  }

  return null;
};
