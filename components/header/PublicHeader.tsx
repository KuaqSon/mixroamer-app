import { createStyles, Header, Group, Burger, Box, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MainLogo from 'components/shared/main-logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'src/context/auth-context';

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

  burger: {
    [theme.fn.largerThan('xs')]: {
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
}));

const links = [
  {
    link: '/about',
    label: 'Features',
  },
  {
    link: '/pricing',
    label: 'Pricing',
  },
  {
    link: '/learn',
    label: 'Learn',
  },
  {
    link: '/community',
    label: 'Community',
  },
];

export default function PublicHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const items = links.map((link) => (
    <Link href={link.link} key={link.label}>
      <UnstyledButton className={cx(classes.link, { [classes.linkActive]: router.pathname === link.link })}>
        {link.label}
      </UnstyledButton>
    </Link>
  ));

  return (
    <Header height={60} sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Box className={classes.header}>
        <Link href={isAuthenticated ? '/app' : '/'}>
          <Box>
            <MainLogo />
          </Box>
        </Link>
        <Group spacing={5} className={classes.links}>
          {items}
          <Link href="/account/login">
            <UnstyledButton className={cx(classes.link, classes.linkHightLight)}>Login</UnstyledButton>
          </Link>
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
      </Box>
    </Header>
  );
}
