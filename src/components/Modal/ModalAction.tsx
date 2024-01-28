import { useTheme } from '@mui/material/styles';
import { Button } from "@mui/material";

type ModalActionProps = {
  text: string;
  color: "primary" | "secondary";
  action: "warning" | "success";
};

export const ModalAction = (
  {
    text,
    color = "primary",
    action = "warning",
    ...props
  }: ModalActionProps) => {
  const theme = useTheme();

  return (
    <Button
      size='large'
      variant="contained"
      sx={{
        width: action === "success" ? "100%" : "auto",

        backgroundColor:
          color === "primary" ?
            theme.colors.secondary100
            : "rgba(0, 0, 0, 0.12)",

        color: color === "primary" ? "#fff"
          : "rgba(0, 0, 0, 0.38)",
      }}
      {...props}
    >
      {text}
    </Button>
  );
};