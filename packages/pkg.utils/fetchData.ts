import { redirect } from 'next/navigation';
import { toast } from 'sonner';

type MethodT = 'GET' | 'PUT' | 'POST' | 'DELETE';

export const fetchData = async (
  pathname: string,
  method: MethodT,
  data?: unknown,
  domain?: string,
) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL ?? domain}${pathname}`;

  try {
    let response: null | Response = null;
    if (data != null) {
      response = await fetch(url, {
        method,
        cache: 'no-store',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }
    if (data == null) {
      response = await fetch(url, {
        method,
        cache: 'no-store',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    if (response?.status === 401 || response?.status === 403 || response?.status === 422) {
      console.log('redirect');
      toast('Пользователь не авторизован');
      redirect('/signin');
    }
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
