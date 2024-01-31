"use client"

import ProjectCard from "@/components/Cards/ProjectCard";
import TagSearch from "@/components/Input/TagSearch";
import ProjectsGrid from "@/components/ProjectGrid";
import { Box, Typography } from "@mui/material";

type ProjectsType = {
  date_post: Date,
  title: string,
  description: string,
  link: string,
  image: string,
  id_user: number,
  tags: string[]
}


export default function DiscoverView() {

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
          <ProjectsGrid>
            {projects?.map((project) => (
              <ProjectCard key={project.id_user} project={project} hasTag={false} />
            ))}
          </ProjectsGrid>
        </Box>
      </Box>
    </section>
  );
};