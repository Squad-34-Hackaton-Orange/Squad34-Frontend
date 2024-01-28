import { Box } from "@mui/material";
import { ReactNode } from "react";

type ModalActionProps = {
  children: ReactNode;
};

export const ModalActions = ({ children, ...props }: ModalActionProps) => {
  return (
    <Box component="div"
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