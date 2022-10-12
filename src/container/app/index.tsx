import { Box, Container, Pagination, Stack, Title } from '@mantine/core';
import EmptySongs from 'components/music/empty-songs';
import SongItem from 'components/music/song-item';
import SongSkeletons from 'components/shared/ui-kit/SongSkeletons';

import dayjs from 'dayjs';
import { useState } from 'react';
import { IQueryMusicParams, useQueryMusics } from 'src/hook/use-query-musics';

import { DEFAULT_PAGINATOR } from 'src/utils/constants';

export default function AppContainer() {
  const [params, setParams] = useState<IQueryMusicParams>({ ...DEFAULT_PAGINATOR });
  const { rows, meta, isLoading } = useQueryMusics(params);
  const totalPage = Math.max(1, (meta?.total || 0) / (meta?.perPage || 1));

  return (
    <>
      <Box>
        <Box p="md" mb="xl">
          <Title>All Songs Music Playlist - {dayjs().format('MMM DD, YYYY')}</Title>
        </Box>
        <Container mb="xl">
          <Stack mb="40px">{isLoading ? <SongSkeletons /> : rows.map((r) => <SongItem key={r.id} music={r} />)}</Stack>
          {meta?.total ? (
            <Pagination
              mt="40px"
              radius="xl"
              disabled={isLoading}
              total={totalPage}
              page={meta?.page || 1}
              onChange={(page) => setParams((prev) => ({ ...prev, page }))}
            />
          ) : (
            !isLoading && <EmptySongs />
          )}
        </Container>
      </Box>
    </>
  );
}
