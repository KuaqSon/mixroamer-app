import PrivateLayout from 'components/layout/PrivateLayout';
import FallbackLoader from 'components/loading/FallbackLoader';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const UploaderContainer = dynamic(() => import('src/container/uploader'), {
  suspense: true,
});

export default function UploaderPage() {
  return (
    <PrivateLayout>
      <Suspense fallback={<FallbackLoader />}>
        <UploaderContainer />
      </Suspense>
    </PrivateLayout>
  );
}
