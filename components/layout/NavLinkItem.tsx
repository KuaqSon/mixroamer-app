import { Anchor, Box, createStyles, Group } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IMenu } from 'src/interfaces/common';

const useStyles = createStyles((theme, { isActive }: { isActive: boolean }) => ({
  anchor: {
    fontWeight: 'bold',
    width: '100%',
    padding: theme.spacing.xs,
    color: isActive ? theme.white : theme.black,
    borderRadius: theme.radius.md,
    backgroundColor: isActive ? theme.colors.blue[6] : theme.white,

    '&:hover': {
      backgroundColor: isActive ? theme.colors.blue[7] : theme.colors.gray[1],
    },
  },
}));

export default function NavLinkItem({ menu }: { menu: IMenu }) {
  const router = useRouter();
  const isActive = router.pathname === menu.slug;
  const { classes } = useStyles({ isActive });

  return (
    <Link href={menu.slug} passHref>
      <Anchor className={classes.anchor} component="a" underline={false}>
        <Group spacing="xs">
          {menu.icon}
          <Box>{menu.title}</Box>
        </Group>
      </Anchor>
    </Link>
  );
}
