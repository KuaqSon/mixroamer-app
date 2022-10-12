import { Box, Space, Stack } from '@mantine/core';
import NavLinkItem from 'components/layout/NavLinkItem';
import MainLogo from 'components/shared/main-logo';
import UserInfoModal from 'components/user-info-modal';
import Link from 'next/link';

import Credit from 'components/credit';
import { MAIN_NAV_LINKS } from 'components/layout/PrivateLayout';

export default function Sidebar() {
  return (
    <Stack justify="flex-start" sx={{ minWidth: '200px', width: '300px' }} py="xl" px="sm">
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
  );
}
