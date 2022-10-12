import { ActionIcon, Box, Center, Drawer, Group, Slider, Stack, Text, Transition } from '@mantine/core';
import {
  IconArrowAutofitUp,
  IconArrowBigLeftLines,
  IconArrowBigRightLines,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
} from '@tabler/icons';
import { useEffect, useRef, useState } from 'react';
import { useStore } from 'src/store';
import ReactPlayer from 'react-player';
import { useAuth } from 'src/context/auth-context';
import getConfig from 'next/config';
import Flex from 'components/shared/ui-kit/Flex';
import Duration from 'components/player/Duration';
import { setItem, getItem } from 'src/lib/localstorage';
import LoopMode from 'components/player/LoopMode';
import { IQueryMusicParams } from 'src/hook/use-query-musics';
import { DEFAULT_PAGINATOR, PLAYER_HEIGHT, PLAYER_WIDTH } from 'src/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { getListMusicsApi } from 'src/utils/api';
import { useLargeDesktopBreak, useMobileBreak } from 'src/hook/use-screen-break';
import Head from 'next/head';
import { buildMediaUrl } from 'src/utils/helper';

const { publicRuntimeConfig } = getConfig();

export default function Player() {
  const { isAuthenticated } = useAuth();
  const isXl = useLargeDesktopBreak();
  const isMobile = useMobileBreak();
  const [opened, setOpened] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const [ready, setReady] = useState<boolean>(false);
  const { playingQueue, setPlayingQueue, playingMusic, playing, togglePlayingMode, playMusic } = useStore(
    (state) => state
  );

  const params: IQueryMusicParams = {
    ...DEFAULT_PAGINATOR,
    limit: 1000,
    playing: 'on',
  };
  useQuery(['musics', params], () => getListMusicsApi(params), {
    onSuccess: (data) => setPlayingQueue(data?.data?.rows || []),
    refetchOnWindowFocus: false,
    enabled: isAuthenticated,
  });

  const [played, setPlayed] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [loopMode, setLoopMode] = useState<'single' | 'all' | 'off' | null>('off');

  useEffect(() => {
    const initLoop = async () => {
      const val = await getItem('loopMode');
      setLoopMode(val as any);
    };
    setReady(true);
    initLoop();
  }, []);

  useEffect(() => {
    setItem('loopMode', loopMode || 'off');
  }, [loopMode]);

  const currentIndex = playingMusic ? playingQueue.map((m) => m.id).indexOf(playingMusic.id) : -1;
  const nextIndex = (currentIndex + 1) % Math.max(playingQueue.length, 1);
  const prevIndex = currentIndex <= 0 ? playingQueue.length - 1 : (currentIndex - 1) % Math.max(playingQueue.length, 1);

  const handleNextSong = () => {
    if (playingQueue[nextIndex]) {
      playMusic(playingQueue[nextIndex]);
    }
  };

  const handlePrevSong = () => {
    if (playingQueue[prevIndex]) {
      playMusic(playingQueue[prevIndex]);
    }
  };

  const handleSeekNextTon = () => {
    const newSeek = (duration * played + 10) / duration;
    playerRef?.current?.seekTo(newSeek);
  };

  const handleSeekPrevTon = () => {
    const newSeek = (duration * played - 10) / duration;
    playerRef?.current?.seekTo(newSeek);
  };

  const handleEnded = () => {
    switch (loopMode) {
      case 'all':
        handleNextSong();
        break;
      case 'off':
        nextIndex !== 0 && handleNextSong();
        break;
      case 'single':
      default:
        break;
    }
  };

  const renderSlider = () => (
    <Stack>
      <Box>
        <Slider
          min={0}
          max={1}
          step={0.001}
          value={played}
          onChange={setPlayed}
          onChangeEnd={(value: number) => playerRef?.current?.seekTo(value)}
          label={null}
        />
      </Box>
      <Flex justifyContent="space-between">
        <Box>
          <Duration seconds={duration * played} />
        </Box>
        <Box>
          <Duration seconds={duration} />
        </Box>
      </Flex>
    </Stack>
  );

  const renderControls = () => (
    <Group p="md">
      <ActionIcon variant="light" radius="xl" size="lg" onClick={() => handleSeekPrevTon()}>
        <IconArrowBigLeftLines />
      </ActionIcon>
      <ActionIcon variant="light" radius="xl" size="lg" onClick={() => handlePrevSong()}>
        <IconPlayerTrackPrev />
      </ActionIcon>
      {playing ? (
        <ActionIcon variant="filled" color="blue" radius="xl" size="xl" onClick={() => togglePlayingMode(false)}>
          <IconPlayerPause />
        </ActionIcon>
      ) : (
        <ActionIcon variant="filled" color="blue" radius="xl" size="xl" onClick={() => togglePlayingMode(true)}>
          <IconPlayerPlay />
        </ActionIcon>
      )}
      <ActionIcon variant="light" radius="xl" size="lg" onClick={() => handleNextSong()}>
        <IconPlayerTrackNext />
      </ActionIcon>
      <ActionIcon variant="light" radius="xl" size="lg" onClick={() => handleSeekNextTon()}>
        <IconArrowBigRightLines />
      </ActionIcon>
      <LoopMode loopMode={loopMode} onChange={setLoopMode} />
    </Group>
  );

  const renderPlayer = () => {
    if (!ready || !playingMusic) {
      return null;
    }

    return (
      <Stack style={{ flex: 1 }} p="md">
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          position="bottom"
          padding="xl"
          size={isMobile ? '100%' : 'auto'}
        >
          <Group noWrap={false}>
            <Center sx={{ width: isMobile ? '100vw' : 'auto' }} p="md">
              <div
                className="vinyl_record vinyl_record_mobile"
                style={{ animationPlayState: playing ? 'running' : 'paused' }}
              >
                <div
                  className="vinyl_label"
                  style={{
                    backgroundImage: `url(${buildMediaUrl(playingMusic.cover)})`,
                  }}
                />
              </div>
            </Center>
            <Stack sx={{ flex: 1 }}>
              <Box sx={{ textAlign: 'center' }}>{playingMusic.title}</Box>
              <Center>{renderControls()}</Center>
              {renderSlider()}
            </Stack>
          </Group>
        </Drawer>

        <Group align="center" sx={{ height: '100%', width: '100%' }}>
          <Box sx={{ flex: 1 }}>
            <Text lineClamp={1}>{playingMusic.title}</Text>
          </Box>
          <Group>
            {playing ? (
              <ActionIcon variant="filled" color="blue" radius="xl" size="xl" onClick={() => togglePlayingMode(false)}>
                <IconPlayerPause />
              </ActionIcon>
            ) : (
              <ActionIcon variant="filled" color="blue" radius="xl" size="xl" onClick={() => togglePlayingMode(true)}>
                <IconPlayerPlay />
              </ActionIcon>
            )}
            <ActionIcon variant="filled" color="dark" radius="xl" size="lg" onClick={() => setOpened(true)}>
              <IconArrowAutofitUp />
            </ActionIcon>
          </Group>
        </Group>
      </Stack>
    );
  };

  const renderBigPlayer = () => {
    if (!ready || !playingMusic) {
      return null;
    }

    return (
      <Stack style={{ flex: 1 }} p="md">
        <Center
          sx={{
            flex: 1,
          }}
        >
          <div className="vinyl_record" style={{ animationPlayState: playing ? 'running' : 'paused' }}>
            <div
              className="vinyl_label"
              style={{
                backgroundImage: `url(${buildMediaUrl(playingMusic.cover)})`,
              }}
            />
          </div>
        </Center>

        <Stack>
          <Box sx={{ textAlign: 'center' }}>{playingMusic.title}</Box>
          <Center>{renderControls()}</Center>
          {renderSlider()}
        </Stack>
      </Stack>
    );
  };

  return (
    <>
      <Head>
        <title>{playingMusic ? `${playingMusic.title} | MixRoamer App` : 'MixRoamer App | nqson'}</title>
      </Head>

      {playingMusic ? (
        <Box sx={{ display: 'none' }}>
          <ReactPlayer
            playing={playing}
            loop={loopMode === 'single'}
            ref={playerRef}
            url={`${publicRuntimeConfig.API_ENDPOINT}${playingMusic.fileUrl}`}
            onProgress={(process) => setPlayed(process.played)}
            onDuration={setDuration}
            onEnded={handleEnded}
            config={{
              file: {
                attributes: {
                  crossOrigin: 'true',
                },
              },
            }}
          />
        </Box>
      ) : null}

      <Transition mounted={ready} transition={isXl ? 'slide-left' : 'slide-up'} duration={600} timingFunction="ease">
        {(styles) => (
          <Box
            style={styles}
            sx={{
              backgroundColor: '#ffffff',
              zIndex: 199,
              position: 'fixed',
              bottom: 0,
              left: isXl ? 'auto' : 0,
              top: isXl ? 0 : 'auto',
              right: 0,
              width: playingMusic ? (isXl ? PLAYER_WIDTH : '100%') : 0,
              height: playingMusic ? (isXl ? '100%' : PLAYER_HEIGHT) : 0,
              display: 'flex',
            }}
          >
            {isXl ? renderBigPlayer() : renderPlayer()}
          </Box>
        )}
      </Transition>
    </>
  );
}
