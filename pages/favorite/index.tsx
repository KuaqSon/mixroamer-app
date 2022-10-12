import PrivateLayout from 'components/layout/PrivateLayout';
import FallbackLoader from 'components/loading/FallbackLoader';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const FavoriteContainer = dynamic(() => import('src/container/favorite'), {
  suspense: true,
});

export default function AppPage() {
  return (
    <PrivateLayout>
      <Suspense fallback={<FallbackLoader />}>
        <FavoriteContainer />
      </Suspense>
    </PrivateLayout>
  );
}
