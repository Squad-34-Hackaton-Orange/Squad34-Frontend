import EditButton from "@/components/buttons/EditButton";
import { Box, Typography, Button, useTheme, Chip, Avatar } from "@mui/material";
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
  },
  hasTag: boolean;
}

export default function ProjectCard({ project, hasTag = true }: Projects) {
  const theme = useTheme();

  const handleDate = (dateString: Date) => {
    const dia = dateString.getUTCDate();
    const mes = dateString.getUTCMonth() + 1;

    const diaMesFormatado = `${dia.toString().padStart(2, "0")}/${mes
      .toString()
      .padStart(2, "0")}`;

    return diaMesFormatado;
  };

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
                  Camila Soares
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
                  {handleDate(project.date_post)}
                </Typography>
              </Box>
              {hasTag ? (
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: { xs: '8px' }
                }}>
                  {project.tags.map((tag, index) => (
                    <Chip label={tag}
                      key={index}
                      sx={{
                        fontSize: '1.3rem',
                        fontWeight: 400,
                      }} />
                  ))}
                </Box>
              ) : null}
            </Box>
          </Box>
        </Button>
        <EditButton />
      </Box>
    );
  }
};
