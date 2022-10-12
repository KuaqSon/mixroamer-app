import { Box, Button, Container, LoadingOverlay, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconNewSection } from '@tabler/icons';
import { useMutation } from '@tanstack/react-query';
import GlassPaper from 'components/shared/ui-kit/GlassPaper';

import useInputStyle from 'src/hook/styles/use-input-style';
import { importMusicFromYoutubeApi } from 'src/utils/api';

type ImportTracksInput = { url: string };

export default function ImportMusicContainer() {
  const inputStyle = useInputStyle();

  const form = useForm<ImportTracksInput>({
    initialValues: {
      url: '',
    },

    validate: {
      url: (value) => (value ? null : 'Url is required'),
    },
  });

  const { mutate, isLoading } = useMutation((data: ImportTracksInput) => importMusicFromYoutubeApi(data), {
    onMutate: () => {
      showNotification({
        id: 'import-new-music-requested',
        title: 'Requested! 😎',
        message: 'New tracks are being imported!',
        color: 'indigo',
      });
    },
    onSuccess: () => {
      showNotification({
        id: 'import-new-music-success',
        title: 'Successfully! 🤩',
        message: 'New tracks have been imported!',
        color: 'green',
      });
      form.reset();
    },
    onError: () => {
      showNotification({
        id: 'create-new-music-failed',
        title: 'Oops! 😞',
        message: 'Something went wrong! Please try again later.',
      });
    },
  });

  return (
    <>
      <Box>
        <Box p="md" mb="xl">
          <Title>Import Songs</Title>
        </Box>
        <Container size="sm" mb="xl">
          <Box sx={{ position: 'relative' }}>
            <LoadingOverlay loaderProps={{ color: 'pink', variant: 'bars' }} overlayOpacity={0.2} visible={isLoading} />
            <form onSubmit={form.onSubmit((values) => mutate(values))}>
              <Stack>
                <GlassPaper>
                  <Stack>
                    <Box sx={{ fontWeight: 600, fontSize: '20px' }}>Import Tracks From YouTube</Box>
                    <TextInput
                      withAsterisk
                      classNames={inputStyle.classes}
                      label="URL"
                      placeholder="https://youtu.be/xxx or https://www.youtube.com/watch?v=xxx"
                      {...form.getInputProps('url')}
                    />
                  </Stack>
                </GlassPaper>
                <GlassPaper>
                  <Button type="submit" radius="xl" variant="filled" color="dark" rightIcon={<IconNewSection />}>
                    Import Tracks
                  </Button>
                </GlassPaper>
              </Stack>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
}
