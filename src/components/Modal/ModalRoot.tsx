"use client"

import React, { ReactNode } from "react";
import { useTheme } from '@mui/material/styles';
import { Box, Modal } from "@mui/material";

type ModalRootProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

export const ModalRoot = ({ children, onClose, open = false, ...props }: ModalRootProps) => {
  const theme = useTheme();
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
      {...props}
    >
      <Box
        sx={{
          maxWidth: 350,
          width: "100%",

          display: "flex",
          flexDirection: "column",
          gap: 3,

          bgcolor: theme.colors.neutral60,
          boxShadow: 4,
          px: 3,
          py: 4,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};