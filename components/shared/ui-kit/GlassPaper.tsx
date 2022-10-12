import { MantineTheme, Paper } from '@mantine/core';

export default function GlassPaper({ children, sx, ...rest }: { children: JSX.Element | JSX.Element[]; sx?: any }) {
  return (
    <Paper
      shadow="lg"
      p="xs"
      sx={(theme: MantineTheme) => ({
        '&:hover': { backgroundColor: theme.white },
        borderRadius: theme.radius.md,
        transition: 'all 0.25 ease',
        background: 'rgba( 255, 255, 255, 0.65 )',
        backdropFilter: 'blur( 20px )',
        WebkitBackdropFilter: 'blur( 20px )',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
        ...sx,
      })}
      {...rest}
    >
      {children}
    </Paper>
  );
}
