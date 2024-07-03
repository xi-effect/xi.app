import { ReactNode } from 'react';
import ProtectedProvider from './providers';

type ProtectedLayoutPropsT = {
  children: ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutPropsT) => (
  <ProtectedProvider>{children}</ProtectedProvider>
);
export default ProtectedLayout;
