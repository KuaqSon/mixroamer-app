import { Anchor, Box, Button, Center, Container, FileInput, Paper, Stack, Title } from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import getConfig from 'next/config';
import { useState } from 'react';
import { uploadFile } from 'src/services/upload-service';

const { publicRuntimeConfig } = getConfig();

export default function UploaderContainer() {
  const [value, setValue] = useState<File | null>(null);
  const [uploadedFilePath, setUploadedFilePath] = useState<string | null>(null);

  const handleUpload = async () => {
    setUploadedFilePath(null);
    const resp = await uploadFile(value as Blob);
    setUploadedFilePath(resp?.result?.file);
  };

  return (
    <>
      <Box py="xl">
        <Center>
          <Title>This is Uploader page</Title>
        </Center>
      </Box>
      <Container size="sm">
        <Stack>
          <FileInput
            label="File"
            placeholder="Select upload file"
            icon={<IconUpload size={14} />}
            value={value}
            onChange={setValue}
          />
          <Button onClick={() => handleUpload()}>Upload</Button>
        </Stack>
        {uploadedFilePath && (
          <Paper p="md" mt="xl" shadow="xs">
            <Anchor href={`${publicRuntimeConfig.API_ENDPOINT}${uploadedFilePath}`} target="_blank">
              {uploadedFilePath}
            </Anchor>
          </Paper>
        )}
      </Container>
    </>
  );
}
