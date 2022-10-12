import { Box, MantineTheme } from '@mantine/core';
import Footer from 'components/footer';
import PublicHeader from 'components/header/PublicHeader';
import { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>
      <Box>
        <PublicHeader />
        <Box
          sx={(t: MantineTheme) => ({
            minHeight: '100vh',
            backgroundColor: t.colors.gray[0],
            padding: `${t.spacing.xl}px 0`,
            marginTop: 60,
          })}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
