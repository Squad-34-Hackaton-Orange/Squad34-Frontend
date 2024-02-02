"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProfileCard from "@/components/Cards/UserProfileCard";
import ProjectsGrid from "@/components/ProjectGrid";
import TagSearch from "@/components/Input/TagSearch";
import ProjectCard from "@/components/Cards/ProjectCard";

type ProjectsType = {
  date_post: Date,
  title: string,
  description: string,
  link: string,
  image: string,
  id_user: number,
  tags: string[]
}


export default function PortifolioView() {
  const theme = useTheme();

  const projects: ProjectsType[] = [{
    date_post: new Date(),
    title: "Ecommerce One Page",
    description: "Descrição do projeto teste",
    link: "https://github.com/camilasoares",
    image: '/project-camila.svg',
    id_user: 1,
    tags: ['UX', 'Web']
  },
  {
    date_post: new Date(),
    title: "Ecommerce One Page",
    description: "Descrição do projeto teste",
    link: "https://github.com/camilasoares",
    image: '/project-camila.svg',
    id_user: 1,
    tags: ['UX', 'Web']
  }];


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
          <ProjectsGrid>
            {projects?.map((project) => (
              <ProjectCard key={project.id_user} project={project} hasTag={true} />
            ))}
          </ProjectsGrid>
        </Box>
      </Box>
    </section>
  );
};
