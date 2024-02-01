'use client';
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Link, Typography, Box } from "@mui/material";
import { Logo } from "../Logo";
import MenuHamburguer from "../HamburguerMenu";
import AvatarButton from "../buttons/AvatarButton";
import NotificationButton from "../buttons/notificationButton";


export default function Header() {  

  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.colors.primary100, boxShadow: {xs: '0 1px 10px #000000BB', sm: 'none'} }}>
      <Box
        sx={{
          width: { xs: "83.6111111%", sm: '95%'  },
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 0",
        }}
      >      

        {/* LOGO && MENU */}
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* MENU MOBILE */}
          <MenuHamburguer />           
          {/* <Image src={Logo} width={83} height={31} alt="orange-logo" sizes="(min-width: 900px) 111px, 41px" /> */}
          <Logo alt={"orange-logo"} />
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: '24px',
              ml: '100px'
            }}
          >
            <Link
              variant="subtitle1"
              href="/descobrir"
              underline="none"
              sx={{ color: theme.colors.neutral60 }}
            >
              <Typography
                sx={{ fontSize: { xs: "16px", sm: '20px' }, lineHeight: { xs: "16px" , sm: '20px' }, fontWeight: 'bold' }}
              >
                Meus Projetos
              </Typography>
            </Link>
            <Link
              variant="subtitle1"
              href="/portifolio"
              underline="none"
              sx={{ color: theme.colors.neutral60 }}
            >
              <Typography
                sx={{ fontSize: { xs: "16px", sm: '20px' }, lineHeight: { xs: "16px", sm: '20px' }, fontWeight: 'bold' }}
              >
                Descobrir
              </Typography>
            </Link>
          </Box>
        </Box>

        {/* AVATAR && NOTIFICATIONS */}
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: '20px'
        }}>

          <AvatarButton width={40} height={40} menu={true} />
          <NotificationButton />

        </Box>
      </Box>
    </Box>
  );
}
