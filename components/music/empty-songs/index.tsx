import { Stack, Center, Group, Text, Button } from '@mantine/core';
import { IconCirclePlus, IconDatabaseImport } from '@tabler/icons';
import GlassPaper from 'components/shared/ui-kit/GlassPaper';
import Link from 'next/link';

export default function EmptySongs() {
  return (
    <Stack>
      <GlassPaper>
        <Center py="xl">
          <Text weight={700} sx={{ letterSpacing: '6px' }}>
            EMPTY!
          </Text>
        </Center>
      </GlassPaper>
      <GlassPaper>
        <Group position="center">
          <Link href="/add-music" passHref>
            <Button radius="xl" variant="filled" color="dark" rightIcon={<IconCirclePlus />}>
              Save New Tracks
            </Button>
          </Link>
          <Link href="/import-music" passHref>
            <Button radius="xl" variant="filled" color="dark" rightIcon={<IconDatabaseImport />}>
              Import Tracks
            </Button>
          </Link>
        </Group>
      </GlassPaper>
    </Stack>
  );
}
