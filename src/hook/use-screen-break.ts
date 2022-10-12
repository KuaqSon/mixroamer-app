import { useMediaQuery } from '@mantine/hooks';

export function useMobileBreak() {
  return useMediaQuery('(max-width: 768px)', false, { getInitialValueInEffect: true });
}

export function useLargeDesktopBreak() {
  return useMediaQuery('(min-width: 1292px)', true, { getInitialValueInEffect: true });
}
