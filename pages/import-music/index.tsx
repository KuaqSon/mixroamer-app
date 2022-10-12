import PrivateLayout from 'components/layout/PrivateLayout';
import FallbackLoader from 'components/loading/FallbackLoader';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ImportMusicContainer = dynamic(() => import('src/container/import-music'), {
  suspense: true,
});

export default function AppPage() {
  return (
    <PrivateLayout>
      <Suspense fallback={<FallbackLoader />}>
        <ImportMusicContainer />
      </Suspense>
    </PrivateLayout>
  );
}
