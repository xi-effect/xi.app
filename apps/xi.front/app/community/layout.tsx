import { Navigation } from 'pkg.navigation';
import { useMainSt } from 'store';

export default function CommunityLayout({ children }) {
  const onSignOut = useMainSt((state) => state.onSignOut);

  return <Navigation onExit={onSignOut}>{children}</Navigation>;
}
