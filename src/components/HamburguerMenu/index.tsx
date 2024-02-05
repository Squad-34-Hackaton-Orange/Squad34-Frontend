'use client'
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  useTheme,
  MenuItem,
  Link,
  Typography,
  Divider,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

const HamburguerMenu = () => {
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
      display: { xs: "flex", sm: "none" }
    }}>

      <IconButton
        aria-label="open drawer"
        onClick={handleClick}
        sx={{ color: theme.colors.secondary60 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            position: "fix",
            maxWidth: 147,
          },
        }}
      >

        <Box>

          <Box sx={{ padding: 1.5 }}>

            <IconButton
              onClick={handleClose}
              sx={{
                backgroundColor: theme.colors.secondary100
              }}
            >

              <CloseIcon sx={{ color: theme.colors.secondary60 }} />

            </IconButton>

          </Box>

          <MenuItem onClick={handleClose}>

            <Link
              variant="subtitle1"
              href="/portfolio"
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
              href="/discover"
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
              href="/portfolio"
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

        </Box>

      </Drawer>

    </Box>
  );
};

export default HamburguerMenu;