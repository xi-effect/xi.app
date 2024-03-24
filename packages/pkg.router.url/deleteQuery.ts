export const deleteQuery = (searchParams: any, name: string) => {
  const params = new URLSearchParams(searchParams.toString());
  params.delete(name);
  return params.toString();
};
