"use client";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, Button, Menu, MenuItem } from "@mui/material";
import { LoginContext } from "@/context/UserContext";
import { User, remove } from "@/lib/api/user";
import { HandleImage } from "@/components/forms/ImageHandle";

type AvatarProps = {
  width: number;
  height: number;
  menu?: boolean;
  user?: User;
  edit?: boolean
};

const AvatarButton = ({ width, height, menu, edit }: AvatarProps) => {
  const { logout, user } = useContext(LoginContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openEditImage, setOpenEditImage] = useState(false)

  

  if (!user?.id) return;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await remove({ id: user?.id as number });
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  if (menu) {
    return (
      <Box>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            padding: 0,
            minWidth: "auto",
          }}
        >
          <Avatar
            alt={user?.image}
            src={user?.image}
            sx={{ width: width, height: height }}
          />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleDelete}>Excluir Conta</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Box>
    );
  }

  if (!menu) {
    return (
      <Button disabled={openEditImage} onClick={() => setOpenEditImage(true)} sx={{
        borderRadius: '50%'
      }}>
        <Avatar
          alt={user?.name}
          src={user?.image}
          sx={{
            width: width,
            height: height,
          }}
        />
        <HandleImage open={openEditImage} setOpen={setOpenEditImage}  />
      </Button>
    );
  }
};

export default AvatarButton;
