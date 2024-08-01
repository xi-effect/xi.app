import { useSearchParams } from 'next/navigation';

// Сохраняем уникальные параметры при редиректе
export const useGetUrlWithParams = () => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(Object.fromEntries(searchParams)).toString();
    const getUrlWithParams = (url: string) => params ? `${url}?${params}` : url;
    return getUrlWithParams;
};
