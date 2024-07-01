import PublicProvider from './providers';

const PublicLayout = async ({ children }) => {
  return <PublicProvider>{children}</PublicProvider>;
};

export default PublicLayout;
