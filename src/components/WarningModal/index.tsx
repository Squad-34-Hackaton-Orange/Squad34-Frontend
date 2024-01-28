import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { CustomModal } from "../Modal";

type WarningModalProps = {
  title: string,
  content: string,
};

export const WarningModal = ({ title, content }: WarningModalProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const theme = useTheme();

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <>
      <Button onClick={handleOpenDelete}>Modal de Excluir</Button>
      <CustomModal.Root open={openDelete} onClose={handleCloseDelete}>
        <CustomModal.Title>
          <Typography
            variant="h5"
            sx={{
              color: theme.colors.neutral110,
            }}
          >
            {title}
          </Typography>
        </CustomModal.Title>
        <CustomModal.Content>
          <Typography
            variant="body1"
            sx={{
              color: theme.colors.neutral110,
            }}
          >
            {content}
          </Typography>
        </CustomModal.Content>
        <CustomModal.Actions>
          <CustomModal.Action text="Excluir" color="primary" action="warning" />
          <CustomModal.Action text="Cancelar" color="secondary" action="warning" />
        </CustomModal.Actions>
      </CustomModal.Root>
    </>
  )
};