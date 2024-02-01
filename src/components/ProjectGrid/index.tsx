"use client";

import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import ProjectCard from "../Cards/ProjectCard";
import {v4} from 'uuid'

type ProjectsType = {
  date_post: Date,
  title: string,
  description: string,
  link: string,
  image: string,
  id_user: number,
  tags: string[]
}

type ProjectsGridType = {
  children: ReactNode
};

const ProjectsGrid = ({ children }: ProjectsGridType) => {
  const projects: ProjectsType[] = [{
    date_post: new Date(),
    title: "Ecommerce One Page",
    description: "Descrição do projeto teste",
    link: "https://github.com/camilasoares",
    image: '/project-camila.svg',
    id_user: 1,
    tags: ['UX', 'Web']
<<<<<<< HEAD
  }]

  //const projects:ProjectsType[] = []
  //  <--------- APAGAR DEPOIS APENAS PARA TESTE 
=======
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
>>>>>>> develop

  if (!projects.length) {
    return (
      <Box sx={{
        width: '100%',
        mt: { xs: '24px', sm: '40px' },
        display: 'grid',
        gridTemplateColumns: {
          xs: '312px', sm: '389px', md: 'repeat(2, 389px)',
          lg: 'repeat(3, 389px)', xl: 'repeat(4, 389px)'
        },
        rowGap: { xs: '16px', sm: '24px' },
        gap: { xs: '16px', sm: '24px' },
        justifyContent: { xs: 'center', md: 'flex-start' }


      }}>
        <ProjectCard hasTag />

      </Box>
    );
  }

  if (projects.length) {
    return (
      <Box sx={{
        width: '100%',
        mt: { xs: '24px', sm: '40px' },
        display: 'grid',
        gridTemplateColumns: {
          xs: '312px', sm: '389px', md: 'repeat(2, 389px)',
          lg: 'repeat(3, 389px)', xl: 'repeat(4, 389px)'
        },
        rowGap: { xs: '16px', sm: '24px' },
        gap: { xs: '16px', sm: '24px' },
        justifyContent: { xs: 'center', md: 'flex-start' },
        pb: '40px'
      }}>
<<<<<<< HEAD
        {projects.map((project) => (
          <ProjectCard key={project.id_user + v4()} project={project} />
        ))}
        {/* map dos cards do projeto */}
=======
        {children}
>>>>>>> develop
      </Box>
    );
  }
};

export default ProjectsGrid;
