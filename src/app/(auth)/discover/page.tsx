"use client"

import TagSearch from "@/components/Input/TagSearch";
import ProjectsGrid from "@/components/ProjectGrid";
import { Box, Typography } from "@mui/material";

export default function Discover() {
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
          <Typography variant="h4" textAlign="center">
            Junte-se à comunidade de inovação, inspiração e descobertas, transformando experiências em conexões inesquecíveis
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            marginTop: 6,
          }}
        >
          <TagSearch />
          <ProjectsGrid />
        </Box>
      </Box>
    </section>
  );
};