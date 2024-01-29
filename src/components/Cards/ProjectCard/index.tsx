import { Box, Typography, Button, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";

interface Projects {
  project?: {
    date_post: Date;
    title: string;
    description: string;
    link: string;
    image: string;
    id_user: number;
    tag: string[];
  };
}

const ProjectCard = ({ project }: Projects) => {
  const theme = useTheme();

  console.log(project);

  if (!project) {
    return (
      //BOTAR A CHAMADA PARA ABRIR O MODAL DE CRIAÇÃO DE PROJETOS
      <>
        <Button
          sx={{
            width: "100%",
            padding: 0,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%" },
              height: "258px",
              backgroundImage: `url('/default-project.svg')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              justifySelf: "center",
              alignSelf: "center",
            }}
          ></Box>
        </Button>
        <Box
          sx={{
            width: { xs: "100%" },
            height: "258px",
            backgroundColor: theme.colors.neutral70,
            justifySelf: "center",
            display: { xs: "none", md: "flex" },
            opacity: "0.2",
          }}
        ></Box>
        <Box
          sx={{
            width: { xs: "100%" },
            height: "258px",
            backgroundColor: theme.colors.neutral70,
            justifySelf: "center",
            display: { xs: "none", lg: "flex" },
            opacity: "0.2",
          }}
        ></Box>
        <Box
          sx={{
            width: { xs: "100%" },
            height: "258px",
            backgroundColor: theme.colors.neutral70,
            justifySelf: "center",
            display: { xs: "none", xl: "flex" },
            opacity: "0.2",
          }}
        ></Box>
      </>
    );
  }

  if (project) {
    return (
      <Box
        sx={{
          width: { xs: "100%" },
          height: "258px",
          backgroundColor: theme.colors.neutral70,
          justifySelf: "center",
          display: { xs: "none", md: "flex" },
          opacity: "0.2",
        }}
      >
        <Button>
          <Box>
            <Image
              src={project.image}
              alt={project.title}
              layout="fill"
              objectFit="cover"
            />
            <Box>
              <Box></Box>
              <Box></Box>
            </Box>
          </Box>
        </Button>
        <Button></Button>
      </Box>
    );
  }
};

export default ProjectCard;

/*
<Button>
    <Box sx={{
      backgroundImage: `url('${/project.image}')`
    }}>
     
 <Box>
 <Box></Box>
 <Box></Box>
</Box>
</Box>
</Button>
*/
