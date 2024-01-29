"use client";
import React from "react";
import { Box, useTheme } from "@mui/material";
import ProjectCard from "../Cards/ProjectCard";


const ProjectsGrid = () => {
  //const user = useContext() < ----- CHAMAR contexto do usuário e depois chamar os projetos desse usuário para renderizar usando o map

  const projects = []

  if (!projects.length) {
    return (
      <Box sx={{
        width: '100%',
        mt: {xs: '24px', sm: '40px'},
        display: 'grid',
        gridTemplateColumns: {xs: '312px', sm: '389px',md: 'repeat(2, 389px)',
        lg: 'repeat(3, 389px)', xl: 'repeat(4, 389px)'},
        rowGap: {xs: '16px', sm: '24px'}, 
        gap: {xs: '16px', sm: '24px'},
        justifyContent: {xs: 'center', md: 'flex-start'}
        

      }}>
          <ProjectCard />
 
      </Box>
    );
  }

  if (projects.length) {
    return (
      <Box sx={{
        mt: {xs: '24px', sm: '40px'},
        display: 'grid',
        gridTemplateColumns: {xs: '1fr', md: '1fr 1fr',
        lg: '1fr 1fr 1fr 1fr'},
        rowGap: {xs: '16px', sm: '24px'}, 
        gap: {xs: '16px', sm: '24px'},
      }}>
        {/* map dos cards do projeto */}
      </Box>
    );
  }
};

export default ProjectsGrid;
