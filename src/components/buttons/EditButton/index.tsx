import EditIcon from "@mui/icons-material/Edit";
import { Box, Fab, IconButton, Link, ListItemIcon, Menu, MenuItem, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

const EditButton = () => {
  const theme = useTheme();

  //HANDLE THE BUTTON
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>      
      <Tooltip title="Menu" sx={{
       position: 'absolute',
       backgroundColor: theme.colors.secondary70,
       width: 28,
       height: 28,
       right: 16,
       top: 16,
       zIndex: 1000,
       '&:hover': {
        backgroundColor: theme.colors.neutral70
       }
      }}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <ListItemIcon sx={{ minWidth: "auto" }}>
            <EditIcon
              sx={{
                color: theme.colors.neutral120,
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
            ml: 1,
            mt: 1.5,
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
              right: 14,
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
        <MenuItem onClick={handleClose} sx={{
            width: 208
        }}>
          <Link
            variant="subtitle1"
            href="/portifolio"
            underline="none"
            sx={{ color: theme.colors.primary90 }}
          >
            <Typography
              sx={{ fontSize: { xs: "16px" }, lineHeight: { xs: "16px" } }}
            >
              Editar
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{
            width: 208
        }}>
          <Link
            variant="subtitle1"
            href="/descobrir"
            underline="none"
            sx={{ color: theme.colors.primary90 }}
          >
            <Typography
              sx={{ fontSize: { xs: "16px" }, lineHeight: { xs: "16px" },  }}
            >
              Excluir
            </Typography>
          </Link>
        </MenuItem>        
      </Menu>
    </>
  );
};

export default EditButton;
