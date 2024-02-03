import { useTheme } from '@mui/material/styles';
import { Button, ButtonProps } from "@mui/material";

type ModalActionProps = ButtonProps & {
  text: string;
  color: "primary" | "secondary";
  actionI: "warning" | "success";
};

export const ModalAction = (
  {
    text,
    color = "primary",
    actionI = "warning",
    ...props
  }: ModalActionProps) => {
  const theme = useTheme();

  const buttonStyle = {
    width: actionI === "success" ? "100%" : "auto",
    backgroundColor: color === "primary" ? theme.colors.secondary100
      : "rgba(0, 0, 0, 0.12)",
    color: color === "primary" ? "#fff"
      : "rgba(0, 0, 0, 0.38)",
  };

  return (
    <Button
      size='large'
      variant="contained"
      sx={buttonStyle}
      {...props}
    >
      {text}
    </Button>
  );
};