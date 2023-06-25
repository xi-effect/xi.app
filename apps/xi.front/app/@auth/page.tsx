'use client';

import { useMainSt } from 'store/main';

import { SignIn } from 'pkg.signin.form';

export default function SignInPage() {
  const signInSt = useMainSt((state) => state.signIn);
  return (
    <div>
      <SignIn signInSt={signInSt} />
    </div>
  );
}
