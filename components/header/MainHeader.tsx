import {
  createStyles,
  Header,
  Burger,
  Box,
  Drawer,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Credit from 'components/credit';
import NavLinkItem from 'components/layout/NavLinkItem';
import { MAIN_NAV_LINKS } from 'components/layout/PrivateLayout';

import MainLogo from 'components/shared/main-logo';
import UserInfoModal from 'components/user-info-modal';
import Link from 'next/link';
import { PLAYER_HEIGHT } from 'src/utils/constants';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    padding: '0 16px',
    boxShadow: theme.shadows.xs,
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  linkHightLight: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      color: '#fff',
    },
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `4px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',
    backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
    // color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));

export default function MainHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx, theme } = useStyles();

  return (
    <Header height={60} sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Box className={classes.header}>
        <Link href="/app">
          <Box>
            <MainLogo />
          </Box>
        </Link>

        <Burger opened={opened} onClick={toggle} size="sm" />
        <Drawer opened={opened} onClose={toggle} padding="xl" size="xl">
          <Stack mt="40px" pb={`calc(${PLAYER_HEIGHT}px + 16px)`} align="center">
            <Link href="/app">
              <Box>
                <MainLogo />
              </Box>
            </Link>
            <UserInfoModal />
            {MAIN_NAV_LINKS.map((m) => (
              <NavLinkItem key={m.slug} menu={m} />
            ))}
            <Credit />
          </Stack>
        </Drawer>
      </Box>
    </Header>
  );
}
