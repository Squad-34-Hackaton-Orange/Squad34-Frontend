"use client";
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import ProfileCard from "@/components/Cards/UserProfileCard";
import ProjectsGrid from "@/components/ProjectGrid";
import TagSearch from "@/components/Input/TagSearch";



const PortifolioView = () => {
  //const user = useContext() <-- CHAMA O USER CONTEXT PARA PEGAR OS DADOS

  const theme = useTheme();

  return (
    <section style={{ height: "100%", width: "100vw" }}>      
      <Box
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: { xs: "86.66666667%", md: "95%" },
          margin: "0 auto",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          rowGap: { xs: "40px", md: "56px" },
        }}
      >
        {/* USER CONTAINER */}
        <Box sx={{ mt: "56px" }}>
          {/* USER CARD */}
          <ProfileCard />
        </Box>
        {/* PROJECTS CONTAINER */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: theme.colors.neutral130,
              mb: "16px",
              opacity: "0.6",
            }}
          >
            Meus projetos
          </Typography>
          <TagSearch />
          {/* PROJECTS GRID */}
            <ProjectsGrid />
        </Box>
      </Box>
    </section>
  );
};

export default PortifolioView;
