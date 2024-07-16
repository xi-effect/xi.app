import { ReactNode } from 'react';
import PublicProvider from './providers';

type PublicLayoutPropsT = {
  children: ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutPropsT) => (
  <PublicProvider>{children}</PublicProvider>
);

export default PublicLayout;
