import { Box, ScrollArea, Space, Stack } from '@mantine/core';
import MainHeader from 'components/header/MainHeader';
import FallbackLoader from 'components/loading/FallbackLoader';

import { ReactNode } from 'react';
import { useAuth } from 'src/context/auth-context';
import { useLargeDesktopBreak, useMobileBreak } from 'src/hook/use-screen-break';
import { useStore } from 'src/store';
import { PLAYER_HEIGHT, PLAYER_WIDTH, SIDEBAR_WIDTH } from 'src/utils/constants';

import { IconDisc, IconHeadphones, IconHeart, IconMusic, IconTank } from '@tabler/icons';
import Credit from 'components/credit';
import NavLinkItem from 'components/layout/NavLinkItem';
import MainLogo from 'components/shared/main-logo';
import UserInfoModal from 'components/user-info-modal';
import Link from 'next/link';
import { IMenu } from 'src/interfaces/common';
import { useRouter } from 'next/router';

export const MAIN_NAV_LINKS: IMenu[] = [
  { slug: '/app', title: 'Discover', icon: <IconDisc /> },
  { slug: '/playing', title: 'Playing', icon: <IconHeadphones /> },
  { slug: '/favorite', title: 'Favorite', icon: <IconHeart /> },
  { slug: '/add-music', title: 'Add Music', icon: <IconMusic /> },
  { slug: '/import-music', title: 'Import Music', icon: <IconTank /> },
];

export default function PrivateLayout({ children }: { children: ReactNode }): JSX.Element {
  const { isLoaded, isAuthenticated } = useAuth();
  const isMobile = useMobileBreak();
  const isXl = useLargeDesktopBreak();
  const router = useRouter();
  const { playingMusic } = useStore((state) => state);

  if (!isLoaded) {
    return <FallbackLoader />;
  }

  if (isLoaded && !isAuthenticated) {
    router.push('/account/login');
    return <></>;
  }

  const renderSidebar = () => {
    if (isMobile) {
      return null;
    }

    return (
      <Box sx={{ position: 'fixed', top: 0, left: 0, bottom: 0 }}>
        <ScrollArea style={{ height: '100%' }}>
          <Stack justify="flex-start" sx={{ minWidth: SIDEBAR_WIDTH, width: SIDEBAR_WIDTH }} py="xl" px="sm">
            <Link href="/app">
              <Box>
                <MainLogo />
              </Box>
            </Link>
            <Space h="xl" />
            <UserInfoModal />
            {MAIN_NAV_LINKS.map((m) => (
              <NavLinkItem key={m.slug} menu={m} />
            ))}
            <Credit />
          </Stack>
        </ScrollArea>
      </Box>
    );
  };

  return (
    <>
      {isMobile && <MainHeader />}
      {renderSidebar()}
      <Box
        style={{
          flex: 1,
          marginLeft: isMobile ? 0 : SIDEBAR_WIDTH,
          marginRight: playingMusic && isXl ? PLAYER_WIDTH : 0,
          transition: 'width 0.5s ease-in',
        }}
      >
        <ScrollArea
          style={{
            flex: 1,
            paddingTop: isMobile ? 84 : 24,
            height: '100vh',
            background: 'linear-gradient(to right, rgb(255, 228, 230), rgb(204, 251, 241))',
            paddingBottom: isXl ? 0 : playingMusic ? `calc(24px + ${PLAYER_HEIGHT}px)` : 0,
          }}
        >
          {children}
        </ScrollArea>
      </Box>
    </>
  );
}
