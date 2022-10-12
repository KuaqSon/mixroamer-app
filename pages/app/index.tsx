import PrivateLayout from 'components/layout/PrivateLayout';
import FallbackLoader from 'components/loading/FallbackLoader';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AppContainer = dynamic(() => import('src/container/app'), {
  suspense: true,
});

export default function AppPage() {
  return (
    <PrivateLayout>
      <Suspense fallback={<FallbackLoader />}>
        <AppContainer />
      </Suspense>
    </PrivateLayout>
  );
}
