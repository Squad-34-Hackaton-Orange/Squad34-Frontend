import { CustomModal } from "@/components/Modal";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { remove } from "@/lib/api/project";
import { LoginContext } from "@/context/UserContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

type DeleteProjectType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId: any;
};

export const DeletarProjeto = ({
  open,
  projectId,
  setOpen,
}: DeleteProjectType) => {
  const { user } = useContext(LoginContext);

  if (!user) {
    return;
  }
  const theme = useTheme();

  const [confirmação, setconfirmação] = useState<boolean>(false);

  const [status, setStatus] = useState<"success" | "bad" | undefined>(
    undefined
  );

  const handleClose = () => {
    setOpen(false);
    setconfirmação(false);
  };

  if (projectId && !confirmação) {
    return (
      <>
        <CustomModal.Root open={open} onClose={handleClose}>
          <Box
            sx={{
              maxWidth: "337px",
            }}
          >
            <CustomModal.Title>
              <Typography variant="h5" color={theme.colors.neutral110}>
                Deseja Excluir?
              </Typography>
            </CustomModal.Title>

            <CustomModal.Content>
              <Typography variant="body1" color={theme.colors.neutral110}>
                Se você prosseguir irá excluir o projeto do seu portfólio
              </Typography>
            </CustomModal.Content>
            <CustomModal.Actions>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "16px",
                }}
              >
                <Typography variant="subtitle1" color={theme.colors.neutral110}>
                  Visualizar publicação
                </Typography>
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
                    onClick={async () => {
                      const id = projectId.toString();

                      const remover = await remove({
                        id: id,
                        id_user: user.id,
                      });

                      console.log(remover);

                      if (remover.status === 200) {
                        setconfirmação(true);
                        setStatus("success");
                      } else {
                        setconfirmação(true);
                        setStatus("bad");
                      }
                    }}
                  >
                    EXCLUIR
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      color: theme.colors.neutral60,
                      backgroundColor: theme.colors.neutral100,
                      opacity: 0.6,
                      margin: ".8rem 0",
                    }}
                    onClick={handleClose}
                  >
                    CANCELAR
                  </Button>
                </Box>
              </Box>
            </CustomModal.Actions>
          </Box>
        </CustomModal.Root>
      </>
    );
  }

  if (confirmação && status) {
    return (
      <>
        <CustomModal.Root open={open} onClose={handleClose}>
          <Box>
            <CustomModal.Title>
              <Typography
                variant="h5"
                color={theme.colors.neutral110}
                sx={{
                  textAlign: "center",
                }}
              >
                Projeto deletado com sucesso!
              </Typography>
            </CustomModal.Title>

            <CustomModal.Content>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "24px",
                }}
              >
                {status === "success" ? (
                  <CheckCircleIcon
                    color="success"
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />
                ) : (
                  <CancelIcon
                    color="error"
                    fontSize="large"
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />
                )}
              </Box>
            </CustomModal.Content>
            <CustomModal.Actions>
              <CustomModal.Action  text="VOLTAR PARA PROJETOS" color='primary' actionI="success" onClick={handleClose}  />
               
                
            </CustomModal.Actions>
          </Box>
        </CustomModal.Root>
      </>
    );
  }
};
