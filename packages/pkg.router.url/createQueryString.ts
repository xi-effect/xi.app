export const createQueryString = (searchParams: any, name: string, value: string) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);
  return params.toString();
};
