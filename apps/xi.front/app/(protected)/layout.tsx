import ProtectedProvider from './providers';

const ProtectedLayout = ({ children }) => {
  return <ProtectedProvider>{children}</ProtectedProvider>;
};

export default ProtectedLayout;
