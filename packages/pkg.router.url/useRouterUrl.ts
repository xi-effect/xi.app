import { useSearchParams } from 'next/navigation';

export const useGetRouterUrl = () => {
  const searchParams = useSearchParams();

  const profileIsOpen = searchParams.get('profileIsOpen');
  const category = searchParams.get('category');
  return {
    category,
    profileIsOpen,
  };
};
