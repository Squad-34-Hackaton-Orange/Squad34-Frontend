import { ReactNode } from 'react';
import { Box } from "@mui/material";

type ModalContentProps = {
  children: ReactNode;
};

export const ModalContent = ({ children, ...props }: ModalContentProps) => {
  return (
    <Box
      component="div"
      {...props}
    >
      {children}
    </Box>
  )
};