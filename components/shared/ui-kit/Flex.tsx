import { Box } from '@mantine/core';
import { ReactNode } from 'react';

export interface FlexOptions {
  alignItems?: string;
  flex?: number;
  justifyContent?: string;
  flexWrap?: string;
  flexDirection?: string;
  flexBasis?: string;
  flexGrow?: string;
  flexShrink?: string;
}

export interface FlexProps extends FlexOptions {
  children?: JSX.Element | JSX.Element[] | ReactNode | ReactNode[];
}

export default function Flex(props: FlexProps): JSX.Element {
  const {
    justifyContent,
    alignItems,
    flexDirection,
    flexWrap,
    flexBasis,
    flexGrow,
    flexShrink,
    flex,
    children,
    ...rest
  } = props;

  const sx = {
    display: 'flex',
    flex,
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
    flexBasis,
    flexGrow,
    flexShrink,
  };

  return (
    <Box sx={sx as any} {...rest}>
      {children}
    </Box>
  );
}
