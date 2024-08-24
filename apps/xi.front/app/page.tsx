import { permanentRedirect } from 'next/navigation';

export default function Main() {
  return permanentRedirect('/signin');
}
