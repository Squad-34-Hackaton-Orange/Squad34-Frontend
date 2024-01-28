import { ReactNode, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { Box, Button, Typography } from "@mui/material";
import { CustomModal } from "../Modal";

type SuccessModalProps = {
  title: string,
  content: ReactNode | string,
};

export const SuccessModal = ({ title, content }: SuccessModalProps) => {
  const [openSuccessIcon, setSuccessIcon] = useState(false);
  const theme = useTheme();

  const handleOpenSuccessIcon = () => {
    setSuccessIcon(true);
  };

  const handleCloseSuccessIcon = () => {
    setSuccessIcon(false);
  };

  return (
    <>
      <Button onClick={handleOpenSuccessIcon}>Modal de Sucesso com ícone</Button>
      <CustomModal.Root open={openSuccessIcon} onClose={handleCloseSuccessIcon}>
        <CustomModal.Title>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              color: theme.colors.neutral110,
            }}
          >
            {title}
          </Typography>
        </CustomModal.Title>
        <CustomModal.Content>
          <Box
            display="flex"
            justifyContent="center"
          >
            {content}
          </Box>
        </CustomModal.Content>
        <CustomModal.Actions>
          <CustomModal.Action
            text="Voltar para projetos"
            color="primary"
            action="success"
          />
        </CustomModal.Actions>
      </CustomModal.Root>
    </>
  )
};