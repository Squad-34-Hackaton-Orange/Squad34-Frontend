import { Box } from "@mui/material";
import { ReactNode } from "react";

type ModalActionsProps = {
  children: ReactNode;
};

export const ModalActions = ({ children, ...props }: ModalActionsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2
      }}
      {...props}
    >
      {children}
    </Box>
  )
}