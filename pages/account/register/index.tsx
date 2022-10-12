import AccountLayout from 'components/layout/AccountLayout';
import FallbackLoader from 'components/loading/FallbackLoader';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const RegisterContainer = dynamic(() => import('src/container/auth/RegisterContainer'), {
  suspense: true,
});

export default function HomePage() {
  return (
    <AccountLayout>
      <Suspense fallback={<FallbackLoader />}>
        <RegisterContainer />
      </Suspense>
    </AccountLayout>
  );
}
