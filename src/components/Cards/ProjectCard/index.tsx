import EditButton from "@/components/buttons/EditButton";
import { Project } from "@/lib/api/project";
import { Box, Typography, Button, useTheme, Chip, Avatar } from "@mui/material";
import React, { useState } from "react";

interface ProjectProps {
  project?: Project;
  hasTag: boolean;
}

export default function ProjectCard({ project, hasTag = true }: ProjectProps) {
  const theme = useTheme();

  const handleDate = (dateString: Date) => {
    const date = new Date(dateString)
    const dia = date.getDate();
    const mes = date.getMonth() + 1;

    const diaMesFormatado = `${dia.toString().padStart(2, "0")}/${mes
      .toString()
      .padStart(2, "0")}`;

    return diaMesFormatado;
  };

  if(!project){
    return;
  }

  



  if (!project) {
    return (
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
          height: { xs: '316px', sm: "298px" },
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
            width: "100%",
            height: "258px",
          }}>
            <Box
              sx={{
                width: "100%",
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
              mt: { xs: '13px' },

              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                rowGap: { xs: '8px' },
                gap: { sm: '8px' }
              }}>
                <Avatar
                  alt="Remy Sharp"
                  src="/hero.svg"
                  sx={{ width: 24, height: 24 }}
                />
                <Typography variant="subtitle1" color={theme.colors.neutral120}>
                  {project?.user?.name}
                </Typography>
                <Typography variant="subtitle1" color={theme.colors.neutral120} sx={{
                  display: { xs: 'none', sm: 'flex' },
                }}>
                  •
                </Typography>
                <Typography variant="subtitle1"
                  sx={{
                    color: { xs: theme.colors.neutral110, sm: theme.colors.neutral120 }
                  }}
                >
                  {project.date_post?handleDate(project.date_post):"Data Indisponível"}
                </Typography>
              </Box>
              {hasTag ? (
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: { xs: '8px' }
                }}>
                  {project?.projectTag?.map((projectTag) => (
                    <div key={projectTag.tag?.id}>
                      <Chip
                        label={projectTag?.tag?.name}
                        sx={{
                          fontSize: '1.3rem',
                          fontWeight: 400,
                        }}
                      />
                    </div>
                  ))}
                </Box>
              ) : null}
            </Box>
          </Box>
        </Button>
        <EditButton projectId={project.id} project={project} /> 
      
      </Box>
    );
  }
};