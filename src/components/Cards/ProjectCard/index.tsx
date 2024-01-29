import EditButton from "@/components/buttons/EditButton";
import { Box, Typography, Button, useTheme, Chip } from "@mui/material";
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
    tags: string[];
  };
}

const ProjectCard = ({ project }: Projects) => {
  const theme = useTheme();

  //Pegar do useContext as informações do usuário

  console.log(project);
  console.log(project?.image);

  const handleDate = (dateString: Date) => {
    // Converter a string para um objeto Date

    // Extrair o dia e o mês
    const dia = dateString.getUTCDate();
    const mes = dateString.getUTCMonth() + 1; // Os meses começam do zero, por isso é adicionado 1

    // Formatar o resultado
    const diaMesFormatado = `${dia.toString().padStart(2, "0")}/${mes
      .toString()
      .padStart(2, "0")}`;

    return diaMesFormatado;
  };

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
          width: "100%",
          height: {xs: '316px', sm: "298px"},
          justifySelf: "center",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Button
          sx={{
            width: "100%",
            padding: 0,
          }}
        >
          <Box sx={{
            width: "100%" ,
            height: "258px",
          }}>
            <Box
              sx={{
                width: "100%" ,
                height: "100%",
                backgroundImage: `url('${project.image}')`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                justifySelf: "center",
                alignSelf: "center",
              }}
            ></Box>

            <Box sx={{
              mt: {xs: '13px'},

              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: {xs: 'column', sm: 'row'},                
                alignItems: {xs: 'flex-start', sm: 'center'},
                rowGap: {xs: '8px'},
                gap: {sm: '8px'}
              }}>
                <Typography variant="subtitle1" color={theme.colors.neutral120}>
                  Camila Soares
                </Typography>
                <Typography variant="subtitle1" color={theme.colors.neutral120} sx={{
                  display: {xs:'none', sm: 'flex'},
                }}>
                •
                </Typography>
                <Typography variant="subtitle1" 
                sx={{
                  color: {xs:theme.colors.neutral110 ,sm:theme.colors.neutral120 }
                }}
                >
                  {handleDate(project.date_post)}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: {xs: '8px'}
              }}>
                {project.tags.map((tag)=> (
                  <Chip label={tag} sx={{
                    fontSize:'1.3rem',
                    fontWeight: 400,
                  }}  />
                ))}
              </Box>
            </Box>
          </Box>
        </Button>
        <EditButton />
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
