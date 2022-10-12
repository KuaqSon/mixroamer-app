import { Box, Title, Text, createStyles, MantineTheme } from '@mantine/core';

const useStyles = createStyles((theme: MantineTheme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 24,
    fontWeight: 900,

    [theme.fn.smallerThan('md')]: {
      fontSize: 28,
    },
  },
}));

export default function MainLogo() {
  const { classes } = useStyles();
  return (
    <Box sx={{ userSelect: 'none', cursor: 'pointer' }}>
      <Title className={classes.title} align="center">
        <Text variant="gradient" component="span" inherit>
          MixRoamer
        </Text>
      </Title>
    </Box>
  );
}
