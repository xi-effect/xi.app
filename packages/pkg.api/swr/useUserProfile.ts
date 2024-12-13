import useSWR from 'swr';
import { servicesMap } from 'pkg.utils';

type ResponseBodyUserT = {
  id: 1;
  username: string;
  display_name: string;
};

// Функция для запроса данных
const fetcher = async (url: string) => {
  const response = await fetch(`${servicesMap.auth}${url}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING || 'false',
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

// Хук для получения профиля пользователя
export const useUserProfile = (id: number) => {
  const { data, error, isLoading } = useSWR<ResponseBodyUserT>(
    id ? `/api/users/by-id/${id}/profile/` : null,
    fetcher,
  );

  let status = 'success';
  if (error) status = 'error';
  if (isLoading) status = 'loading';

  return {
    data,
    status,
    error,
  };
};
