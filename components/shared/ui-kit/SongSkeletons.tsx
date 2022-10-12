import { Group, Skeleton, Stack } from '@mantine/core';
import GlassPaper from 'components/shared/ui-kit/GlassPaper';

export default function SongSkeletons({ rows = 3 }: { rows?: number }) {
  return (
    <Stack>
      {[...Array(rows)].map((_, idx) => (
        <GlassPaper key={idx}>
          <Group noWrap>
            <Skeleton height={50} circle />
            <Skeleton height={50} radius="md" />
          </Group>
        </GlassPaper>
      ))}
    </Stack>
  );
}
