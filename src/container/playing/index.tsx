import { Box, Container, Stack, Title } from '@mantine/core';
import EmptySongs from 'components/music/empty-songs';
import SongItem from 'components/music/song-item';

import { useStore } from 'src/store';

export default function PlayingContainer() {
  const { playingQueue } = useStore((state) => state);

  return (
    <>
      <Box>
        <Box p="md" mb="xl">
          <Title>Playing Queue</Title>
        </Box>
        <Container mb="xl">
          <Stack mb="40px">
            {playingQueue.map((r) => (
              <SongItem key={r.id} music={r} />
            ))}
            {playingQueue.length === 0 && <EmptySongs />}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
