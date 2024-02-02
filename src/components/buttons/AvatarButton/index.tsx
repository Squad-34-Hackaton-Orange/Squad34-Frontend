'use client'
import React, { useContext, useState } from 'react'
import { Avatar, Box, Button, Menu, MenuItem } from '@mui/material'
import { LoginContext } from '@/context/UserContext'


type AvatarProps = {
  width: number,
  height: number,
  menu?: boolean
}


const AvatarButton = ({ width, height, menu }: AvatarProps) => {
  const { logout } = useContext(LoginContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (menu) {

    return (
      <Box>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            padding: 0,
            minWidth: 'auto'

          }}
        >
          <Avatar alt="Remy Sharp" src="/hero.svg" sx={{ width: width, height: height }} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Atualizar Perfil</MenuItem>
          <MenuItem onClick={handleClose}>Trocar Senha</MenuItem>
          <MenuItem onClick={handleClose}>Excluir Conta</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Box>
    )

  }

  if (!menu) {
    return (
      <Box>
        <Avatar alt="Remy Sharp" src="/hero.svg" sx={{ width: width, height: height }} />
      </Box>
    )
  }
}

export default AvatarButton