import EditButton from "@/components/buttons/EditButton";
import { Project } from "@/lib/api/project";
import { User } from "@/lib/api/user";
import { Box, Typography, Button, useTheme, Chip, Avatar } from "@mui/material";
import React from "react";
interface ProjectProps {
  project?: Project;
  hasTag: boolean;
  hasEditButton: boolean;
  user?: User;
}

export default function ProjectCard({
  project,
  hasTag = true,
  hasEditButton,
  user
}: ProjectProps) {
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

  if (!project) {
    return (
      <Typography variant="h6" color={theme.colors.neutral120}>
        Nenhum projeto encontrado
      </Typography>
    )
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
                  alt={project?.user?.name}
                  src={project?.user?.image}
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
                  {project.date_post ? handleDate(project.date_post) : "Data Indisponível"}
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
        <EditButton
          visible={hasEditButton}
          projectId={project.id}
          project={project}
        />

      </Box>
    );
  }
};