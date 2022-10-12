import { ActionIcon, Box, Group, Image, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  IconHeart,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlaylist,
  IconPlaylistOff,
  IconTrash,
} from '@tabler/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Flex from 'components/shared/ui-kit/Flex';
import GlassPaper from 'components/shared/ui-kit/GlassPaper';
import { useMobileBreak } from 'src/hook/use-screen-break';

import { IMusic } from 'src/interfaces/music';
import { useStore } from 'src/store';
import { deleteMusicApi, updateMusicApi } from 'src/utils/api';
import { buildMediaUrl } from 'src/utils/helper';

export default function SongItem({ music }: { music: IMusic }) {
  const isMobile = useMobileBreak();
  const { playMusic, playingMusic, togglePlayingMode, playing } = useStore((state) => state);
  const isActiveMusic = playingMusic && playingMusic.id === music.id;
  const queryClient = useQueryClient();
  const { isLoading: updating, mutate: update } = useMutation((data: IMusic) => updateMusicApi(music.id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['musics']);
    },
  });

  const { mutate: performDelete, isLoading: deleting } = useMutation((id: number) => deleteMusicApi(id), {
    onSuccess: () => {
      showNotification({
        id: 'remove-music-successfully',
        title: 'Removed!',
        message: 'Tracks have been removed! 🎉',
      });
      queryClient.invalidateQueries(['musics']);
      if (isActiveMusic) {
        playMusic(null);
      }
    },
    onError: () => {
      showNotification({
        id: 'remove-music-failed',
        title: 'Oops! 😞',
        message: 'Something went wrong! Please try again later.',
      });
    },
  });

  const handlePlayMusic = () => {
    playMusic(music);
    if (!music.playing) {
      update({ playing: true } as IMusic);
    }
  };

  return (
    <GlassPaper>
      <Stack>
        {isMobile && (
          <Flex flexDirection="column" justifyContent="center">
            <Text lineClamp={1} size="sm" color="gray.8">
              {music.singer}
            </Text>
            <Text lineClamp={1} weight={500}>
              {music.title}
            </Text>
          </Flex>
        )}
        <Group>
          {isMobile ? (
            <Box>
              <Image width={50} height={50} fit="cover" radius={999} src={buildMediaUrl(music.cover)} withPlaceholder />
            </Box>
          ) : (
            <Flex flex={1}>
              <Box mr="md">
                <Image
                  width={50}
                  height={50}
                  fit="cover"
                  radius={999}
                  src={buildMediaUrl(music.cover)}
                  withPlaceholder
                />
              </Box>
              <Flex flexDirection="column" justifyContent="center">
                <Text lineClamp={1} size="sm" color="gray.8">
                  {music.singer}
                </Text>
                <Text lineClamp={1} weight={500}>
                  {music.title}
                </Text>
              </Flex>
            </Flex>
          )}
          <Group spacing={6}>
            {isActiveMusic && playing ? (
              <ActionIcon variant="filled" color="blue" radius="xl" size="lg" onClick={() => togglePlayingMode(false)}>
                <IconPlayerPause />
              </ActionIcon>
            ) : (
              <ActionIcon variant="light" color="blue" radius="xl" size="lg" onClick={() => handlePlayMusic()}>
                <IconPlayerPlay />
              </ActionIcon>
            )}
            <ActionIcon
              variant={music.favorite ? 'filled' : 'light'}
              color={music.favorite ? 'red' : 'gray'}
              radius="xl"
              loading={updating}
              onClick={() => update({ favorite: !music.favorite } as IMusic)}
            >
              <IconHeart size={18} />
            </ActionIcon>
            <ActionIcon
              variant={music.playing ? 'filled' : 'light'}
              color={music.playing ? 'green' : 'gray'}
              radius="xl"
              loading={updating}
              onClick={() => update({ playing: !music.playing } as IMusic)}
            >
              {music.playing ? <IconPlaylist size={18} /> : <IconPlaylistOff size={18} />}
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="orange"
              radius="xl"
              loading={deleting}
              onClick={() => performDelete(music.id)}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Group>
      </Stack>
    </GlassPaper>
  );
}
