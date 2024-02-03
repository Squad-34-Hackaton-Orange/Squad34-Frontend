"use client";

import React, { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Modal } from "@mui/material";

type ModalRootProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  variant?: "form" | undefined;
};

export const ModalRoot = ({
  children,
  variant = undefined,
  onClose,
  open = false,
  ...props
}: ModalRootProps) => {
  const theme = useTheme();

  if (variant) {
    return (
      <Modal
        open={open}
        onClose={onClose}
        className="modalStyle1"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          position: 'fixed',
        }}
        {...props}
      >
        <Box
          sx={{
            maxWidth: "890px",
            width: { xs: "312px", sm: '95%' },
            maxHeight: '800px',

            display: "flex",
            flexDirection: "column",
            gap: 3,

            bgcolor: theme.colors.neutral60,
            boxShadow: 4,
            px: 3,
            py: 4,
            position: 'fixed',
            top: { xs: '36px' },
            overflow: 'scroll'
          }}
        >
          {children}
        </Box>
      </Modal>
    );
  }

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
