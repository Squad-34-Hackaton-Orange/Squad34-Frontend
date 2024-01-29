import { Box, Typography, Button, useTheme } from "@mui/material";
import React from "react";

interface Project {
  projects?: {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    tags: string[];
  }[];
}

const ProjectCard = ({ projects }: Project) => {
  const theme = useTheme()


  if (!projects) {
    return (
      //BOTAR A CHAMADA PARA ABRIR O MODAL DE CRIAÇÃO DE PROJETOS
      <>
        <Button sx={{
          width: '100%',
          padding: 0
        }}>
          <Box
            sx={{
              width: {xs: "100%"},
              height: "258px",
              backgroundImage: `url('/default-project.svg')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              justifySelf: 'center',
              alignSelf: 'center'
              
            }}
          ></Box>
        </Button>
        <Box
          sx={{
            width: {xs: "100%"},
            height: "258px",
            backgroundColor: theme.colors.neutral70,
            justifySelf: 'center',
            display: { xs: "none", md: "flex" },
            opacity: '0.2'
            
          }}
        ></Box>
        <Box
          sx={{
            width: {xs: "100%"},
            height: "258px",
            backgroundColor: theme.colors.neutral70,
            justifySelf: 'center',
            display: { xs: "none", lg: "flex" },
            opacity: '0.2'
            
          }}
        ></Box>
        <Box
          sx={{
            width: {xs: "100%"},
            height: "258px",
            backgroundColor: theme.colors.neutral70,
            justifySelf: 'center',
            display: { xs: "none", xl: "flex" },
            opacity: '0.2'
            
          }}
        ></Box>
      </>
    );
  }

  if(projects){
    
  }

  return <div>ProjectCard</div>;
};

export default ProjectCard;
