import { ActionIcon } from '@mantine/core';
import { IconRefresh, IconRefreshOff, IconReload } from '@tabler/icons';

type LoopModes = 'single' | 'all' | 'off' | null;

export default function LoopMode({ loopMode, onChange }: { loopMode: LoopModes; onChange: (mode: LoopModes) => void }) {
  const handleChange = () => {
    // single -> all -> off -> single
    switch (loopMode) {
      case 'single':
        onChange('all');
        break;

      case 'all':
        onChange('off');
        break;
      case 'off':
        onChange('single');
        break;
      default:
        break;
    }
  };

  const icon = loopMode === 'single' ? <IconRefresh /> : loopMode === 'all' ? <IconReload /> : <IconRefreshOff />;

  return (
    <>
      <ActionIcon
        variant="subtle"
        color={loopMode === 'off' ? 'gray' : 'blue'}
        radius="xl"
        size="lg"
        onClick={() => handleChange()}
      >
        {icon}
      </ActionIcon>
    </>
  );
}
