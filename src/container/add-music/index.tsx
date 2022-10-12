import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  FileInput,
  Image,
  LoadingOverlay,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconNewSection, IconUpload } from '@tabler/icons';
import { useMutation } from '@tanstack/react-query';
import GlassPaper from 'components/shared/ui-kit/GlassPaper';

import getConfig from 'next/config';
import useInputStyle from 'src/hook/styles/use-input-style';
import { IMusic } from 'src/interfaces/music';
import { uploadFile } from 'src/services/upload-service';
import { createMusicApi } from 'src/utils/api';

const { publicRuntimeConfig } = getConfig();

type TracksInput = Omit<IMusic, 'id' | 'userId' | 'createdAt' | 'updatedAt'> & { coverInput?: File; fileInput?: File };

export default function AddMusicContainer() {
  const inputStyle = useInputStyle();

  const form = useForm<TracksInput>({
    initialValues: {
      title: '',
      singer: '',
      cover: '',
      source: '',
      fileUrl: '',
      playing: false,
      favorite: false,
      coverInput: undefined,
      fileInput: undefined,
    },

    validate: {
      title: (value) => (value ? null : 'Title is required'),
      singer: (value) => (value ? null : 'Singer is required'),
      cover: (value) => (value ? null : 'Cover is required'),
      fileUrl: (value) => (value ? null : 'File is required'),
    },
  });

  const { mutate, isLoading } = useMutation((data: TracksInput) => createMusicApi(data), {
    onSuccess: () => {
      showNotification({
        id: 'create-new-music-successfully',
        title: 'Successfully!',
        message: 'New tracks have been added! 🎉',
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

  const handleUploadCover = async (file: File) => {
    if (!file) {
      return;
    }

    const resp = await uploadFile(file as Blob);
    form.setValues({ ...form.values, cover: resp?.file || '' } as TracksInput);
  };

  const handleUploadTracks = async (file: File) => {
    if (!file) {
      return;
    }

    const resp = await uploadFile(file as Blob);
    form.setValues({ ...form.values, fileUrl: resp?.file || '' } as TracksInput);
  };

  const coverUrl = `${publicRuntimeConfig.API_ENDPOINT}${form.values.cover}`;

  return (
    <>
      <Box>
        <Box p="md" mb="xl">
          <Title>Save New Tracks</Title>
        </Box>
        <Container size="sm" mb="xl">
          <Box sx={{ position: 'relative' }}>
            <LoadingOverlay loaderProps={{ color: 'pink', variant: 'bars' }} overlayOpacity={0.2} visible={isLoading} />
            <form onSubmit={form.onSubmit((values) => mutate(values))}>
              <Stack>
                <GlassPaper>
                  <Stack>
                    <Box sx={{ fontWeight: 600, fontSize: '20px' }}>Meta Info</Box>
                    <TextInput
                      withAsterisk
                      classNames={inputStyle.classes}
                      label="Title"
                      {...form.getInputProps('title')}
                    />
                    <TextInput
                      withAsterisk
                      classNames={inputStyle.classes}
                      label="Singer | Author"
                      {...form.getInputProps('singer')}
                    />
                    <TextInput classNames={inputStyle.classes} label="Source" {...form.getInputProps('source')} />
                    <Checkbox label="Add to playing queue?" {...form.getInputProps('playing')} />
                    <Checkbox label="Add to favorite queue?" {...form.getInputProps('favorite')} />
                  </Stack>
                </GlassPaper>
                <GlassPaper>
                  <Stack>
                    <Box sx={{ fontWeight: 600, fontSize: '20px' }}>Cover</Box>
                    <FileInput
                      name="cover"
                      placeholder="Select upload file"
                      icon={<IconUpload size={14} />}
                      accept="image/*"
                      {...form.getInputProps('coverInput')}
                      onChange={handleUploadCover}
                      error={form.errors.cover}
                    />
                    <Center>
                      <Image
                        src={coverUrl}
                        height={200}
                        width="auto"
                        sx={{ minWidth: '200px' }}
                        imageProps={{ crossOrigin: 'anonymous' }}
                        withPlaceholder
                      />
                    </Center>
                  </Stack>
                </GlassPaper>
                <GlassPaper>
                  <Stack>
                    <Box sx={{ fontWeight: 600, fontSize: '20px' }}>Tracks File</Box>
                    <FileInput
                      name="tracks-file"
                      placeholder="Select upload file"
                      icon={<IconUpload size={14} />}
                      accept="audio/*"
                      {...form.getInputProps('fileInput')}
                      onChange={handleUploadTracks}
                      error={form.errors.fileUrl}
                    />
                  </Stack>
                </GlassPaper>
                <GlassPaper>
                  <Button type="submit" radius="xl" variant="filled" color="dark" rightIcon={<IconNewSection />}>
                    Save Tracks
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
