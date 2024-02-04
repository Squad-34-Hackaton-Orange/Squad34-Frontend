"use client";
import React, { useContext, useState } from 'react'
import { Box, Button, Typography, useTheme } from "@mui/material";
import AvatarButton from "@/components/buttons/AvatarButton";
import { LoginContext } from '@/context/UserContext';
import AddProjectModal from '@/components/forms/AdicionarProjeto';
import { User } from '@/lib/api/user';

type ProfileCardProps = {
  userImage?: User;
};


const ProfileCard = ({ userImage }: ProfileCardProps) => {
  const { user } = useContext(LoginContext);
  const [modalOpen, setModalOpen] = useState(false);

  const theme = useTheme();


  if (!user) {
    return;
  }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      alignItems: "center",
      justifyContent: "center",
      rowGap: '16px',
      gap: { sm: '42px' }
    }}>
      <AvatarButton
        user={userImage}
        width={122}
        height={122}
      />
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        rowGap: { xs: '8px', sm: '16px' }
      }}>
        <Typography variant="h5" color={theme.colors.neutral120}>
          {user.name} {user.last_name}
        </Typography>
        <Typography variant="subtitle1" color={theme.colors.neutral130}
          sx={{
            opacity: '0.6'
          }}
        >
          {user.country}
        </Typography>
        <Button
          onClick={() => setModalOpen(true)}
          variant="contained"
          style={{
            backgroundColor: 'rgba(0,0,0, 0.12)',
            color: 'rgba(0,0,0, 0.38)',
            borderRadius: "4px",
          }}
        >
          <Typography variant="button">
            Adicionar Projeto
          </Typography>
        </Button>
        <AddProjectModal open={modalOpen} setOpen={setModalOpen} />
      </Box>
    </Box>
  )
}

export default ProfileCard