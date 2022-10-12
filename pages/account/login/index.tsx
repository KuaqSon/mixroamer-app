import AccountLayout from 'components/layout/AccountLayout';
import PublicLayout from 'components/layout/PublicLayout';
import FallbackLoader from 'components/loading/FallbackLoader';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const LoginContainer = dynamic(() => import('src/container/auth/LoginContainer'), {
  suspense: true,
});

export default function LoginPage() {
  return (
    <AccountLayout>
      <Suspense fallback={<FallbackLoader />}>
        <LoginContainer />
      </Suspense>
    </AccountLayout>
  );
}
