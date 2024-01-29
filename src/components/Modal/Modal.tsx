import { ReactNode } from "react";
import { Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { CustomModal } from "../Modal";

type ModalProps = {
  open: boolean,
  onClose: () => void,
  title: string,
  content: string | ReactNode,
  actions: ReactNode;
};

export const Modal = ({ open, onClose, title, content, actions }: ModalProps) => {
  const theme = useTheme();
  const isContentReactNode = typeof content === "object";

  return (
    <CustomModal.Root open={open} onClose={onClose}>
      <CustomModal.Title>
        <Typography
          variant="h5"
          sx={{
            color: theme.colors.neutral110,
            textAlign: isContentReactNode ? "center" : "unset",
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
            textAlign: isContentReactNode ? "center" : "unset",
          }}
        >
          {content}
        </Typography>
      </CustomModal.Content>
      <CustomModal.Actions>
        {actions}
      </CustomModal.Actions>
    </CustomModal.Root>
  )
};