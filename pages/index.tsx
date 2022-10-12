import { Anchor, Center } from '@mantine/core';
import PublicLayout from 'components/layout/PublicLayout';
import FallbackLoader from 'components/loading/FallbackLoader';
import { ColorSchemeToggle } from 'components/shared/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from 'components/shared/Welcome/Welcome';
import Link from 'next/link';
import { Suspense } from 'react';

export default function IndexPage() {
  return (
    <>
      <PublicLayout>
        <Suspense fallback={<FallbackLoader />}>
          <Welcome />
          <ColorSchemeToggle />
          <Center p="lg">
            <Link href="/account/login">
              <Anchor>Login</Anchor>
            </Link>
          </Center>
        </Suspense>
      </PublicLayout>
    </>
  );
}
