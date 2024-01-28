'use client'
import React, { useContext, useState } from 'react'
import { Avatar, Box, Button, Menu, MenuItem } from '@mui/material'


const AvatarButton = () => {

  //const user = useContext() <----- CHAMAR O CONTEXTO DE USUÁRIO PARA PEGAR A IMAGEM
  // const {profile} = user

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
      <Avatar alt="Remy Sharp" src="/hero.svg" sx={{ width: 40, height: 40 }} />
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
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}

export default AvatarButton