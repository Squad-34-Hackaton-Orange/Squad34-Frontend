import { CustomModal } from "@/components/Modal";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { LoginContext } from "@/context/UserContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

type DeleteProjectType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  status: boolean;
};

export const ConfirmacaoDeletarProjeto = ({
  open,
  setOpen,
  status,
}: DeleteProjectType) => {
  const { user } = useContext(LoginContext);

  if (!user) {
    return;
  }
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomModal.Root open={open} onClose={handleClose}>
        <Box>
          <CustomModal.Title>
            <Typography variant="h5" color={theme.colors.neutral110}>
              Projeto deletado com sucesso!
            </Typography>
          </CustomModal.Title>

          <CustomModal.Content>
            {status ? (
              <CheckCircleIcon color="success" fontSize="large" />
            ) : (
              <CancelIcon color="error" fontSize="large" />
            )}
          </CustomModal.Content>
          <CustomModal.Actions>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "16px",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    color: theme.colors.neutral60,
                    backgroundColor: theme.colors.secondary100,
                    margin: ".8rem 0",
                  }}
                  onClick={handleClose}
                >
                  VOLTAR PARA PROJETOS
                </Button>
              </Box>
            </Box>
          </CustomModal.Actions>
        </Box>
      </CustomModal.Root>
    </>
  );
};
