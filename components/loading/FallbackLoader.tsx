import { Center, Loader } from '@mantine/core';

export default function FallbackLoader(): JSX.Element {
  return (
    <Center p="48px">
      <Loader size="lg" color="dark" />
    </Center>
  );
}
