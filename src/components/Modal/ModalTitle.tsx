import { Box } from '@mui/material';
import { ReactNode } from 'react';

type ModalTitleProps = {
  children: ReactNode;
};

export const ModalTitle = ({ children, ...props }: ModalTitleProps) => {
  return (
    <Box {...props}>
      {children}
    </Box>
  )
};