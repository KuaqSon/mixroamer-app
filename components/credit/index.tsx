import { Anchor, Group, ThemeIcon } from '@mantine/core';
import { IconBrandGithub, IconDeviceLaptop } from '@tabler/icons';

export default function Credit() {
  return (
    <Group position="center" mt="xl">
      <Anchor href="https://nqson.com/" target="_blank" underline={false}>
        <ThemeIcon radius="xl" size="lg" variant="default">
          <IconDeviceLaptop />
        </ThemeIcon>
      </Anchor>
      <Anchor href="https://github.com/KuaqSon/mixroamer-app" target="_blank" underline={false}>
        <ThemeIcon radius="xl" size="lg" variant="default">
          <IconBrandGithub />
        </ThemeIcon>
      </Anchor>
    </Group>
  );
}
