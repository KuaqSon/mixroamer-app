import PrivateLayout from 'components/layout/PrivateLayout';
import FallbackLoader from 'components/loading/FallbackLoader';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const PlayingContainer = dynamic(() => import('src/container/playing'), {
  suspense: true,
});

export default function AppPage() {
  return (
    <PrivateLayout>
      <Suspense fallback={<FallbackLoader />}>
        <PlayingContainer />
      </Suspense>
    </PrivateLayout>
  );
}
