"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProfileCard from "@/components/Cards/UserProfileCard";
import ProjectsGrid from "@/components/ProjectGrid";
import TagSearch from "@/components/Input/TagSearch";

export default function PortifolioView() {
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
        <Box sx={{ mt: "56px" }}>
          <ProfileCard />
        </Box>
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
          <ProjectsGrid />
        </Box>
      </Box>
    </section>
  );
};
