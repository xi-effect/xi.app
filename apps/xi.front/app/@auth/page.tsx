'use client';

import { useMainSt } from 'store/main';

import { SignIn } from 'pkg.signin.form';

export default function SignInPage() {
  const signIn = useMainSt((state) => state.signIn);
  const onSignIn = useMainSt((state) => state.onSignIn);

  return (
    <div>
      <SignIn signIn={signIn} onSignIn={onSignIn} />
    </div>
  );
}
