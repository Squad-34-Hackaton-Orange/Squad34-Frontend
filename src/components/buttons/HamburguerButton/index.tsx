'use client'
import React, { useState } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  ListItemIcon,
  Menu,
  useTheme,
  MenuItem,
  Link,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";



const ButtonHambuerguer = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const theme = useTheme();

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{
      display: { xs: "flex", sm: "none" }, }}>
      <Tooltip title="Menu" sx={{}}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <ListItemIcon sx={{ minWidth: "auto" }}>
            <MenuIcon
              sx={{
                color: "white",
              }}
            />
          </ListItemIcon>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            position: "absolute",
            ml: "4%",
            mt: 1.5,
            maxWidth: 147,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            variant="subtitle1"
            href="/portifolio"
            underline="none"
            sx={{ color: theme.colors.primary90 }}
          >
            <Typography
              sx={{ fontSize: { xs: "16px" }, lineHeight: { xs: "16px" } }}
            >
              Meus Projetos
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            variant="subtitle1"
            href="/descobrir"
            underline="none"
            sx={{ color: theme.colors.primary90 }}
          >
            <Typography
              sx={{ fontSize: { xs: "16px" }, lineHeight: { xs: "16px" } }}
            >
              Descobrir
            </Typography>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Link
            variant="subtitle1"
            href="/portifolio"
            underline="none"
            sx={{ color: theme.colors.primary90 }}
          >
            <Typography
              sx={{ fontSize: { xs: "16px" }, lineHeight: { xs: "16px" } }}
            >
              Configurações
            </Typography>
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ButtonHambuerguer;
