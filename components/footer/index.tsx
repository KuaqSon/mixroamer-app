import { createStyles, Container, Group, Anchor } from '@mantine/core';
import MainLogo from 'components/shared/main-logo';

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const links = [
  {
    link: '#',
    label: 'Contact',
  },
  {
    link: '#',
    label: 'Privacy',
  },
  {
    link: '#',
    label: 'Blog',
  },
  {
    link: '#',
    label: 'Careers',
  },
];

export default function Footer() {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<'a'> color="dimmed" key={link.label} href={link.link} onClick={(event) => event.preventDefault()} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <MainLogo />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
