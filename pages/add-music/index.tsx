import PrivateLayout from 'components/layout/PrivateLayout';
import FallbackLoader from 'components/loading/FallbackLoader';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AddMusicContainer = dynamic(() => import('src/container/add-music'), {
  suspense: true,
});

export default function AppPage() {
  return (
    <PrivateLayout>
      <Suspense fallback={<FallbackLoader />}>
        <AddMusicContainer />
      </Suspense>
    </PrivateLayout>
  );
}
