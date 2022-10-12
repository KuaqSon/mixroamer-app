import { Avatar, Box, Button, createStyles, Group, Modal, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
import { useState } from 'react';
import { useAuth } from 'src/context/auth-context';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.gray[0],

    '&:hover': {
      backgroundColor: theme.colors.gray[1],
    },
  },
}));

export default function UserInfoModal() {
  const { user, isLoaded, signOut } = useAuth();
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  if (!isLoaded || !user) {
    return null;
  }

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Account Info">
        <Stack align="center" justify="center">
          <Box>
            <Avatar size={100} radius={999} color="dark">
              {user.name[0]}
            </Avatar>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Text size="xl" weight={600}>
              {user.name}
            </Text>
            <Text size="sm">{user.email}</Text>
          </Box>

          <Button mt="xl" color="red" variant="light" size="sm" onClick={() => signOut()}>
            Log Out
          </Button>
        </Stack>
      </Modal>

      <UnstyledButton className={classes.user} onClick={() => setOpened(true)}>
        <Group spacing="xs">
          <Avatar radius={999} color="dark">
            {user.name[0]}
          </Avatar>
          <Box sx={{ flex: 1, fontWeight: 'bold' }}>{user.name}</Box>
          <IconChevronRight size={14} stroke={1.5} />
        </Group>
      </UnstyledButton>
    </>
  );
}
