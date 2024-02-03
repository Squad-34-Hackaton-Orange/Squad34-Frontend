import { CustomModal } from "@/components/Modal";
import AvatarButton from "@/components/buttons/AvatarButton";
import EditButton from "@/components/buttons/EditButton";
import { Project } from "@/lib/api/project";
import { User } from "@/lib/api/user";
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, Button, Chip, Avatar, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

type PreviewCardProps = {
  project: Project;
  open: boolean;
  handleClose: () => void;
};

const PreviewProject = ({ open, handleClose, project }: PreviewCardProps) => {
  const theme = useTheme();

  return (
    <CustomModal.Root
      open={open}
      variant="form"
      onClose={handleClose}
    >

      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 1,
          padding: 2
        }}
      >
        <Button
          sx={{
            color: theme.colors.neutral130,
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        sx={{
          padding: {
            xs: 0,
            sm: 3
          }
        }}
      >
        <CustomModal.Title>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box
              display="flex"
              gap={1}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{
                  width: 24,
                  height: 24,
                  display: {
                    xs: "none",
                    sm: "flex"
                  }
                }}
              />

              <Box
                display="flex"
                flexDirection="column"
                sx={{
                  display: {
                    xs: "none",
                    sm: "flex"
                  }
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                  >
                    {project?.user?.name}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption">
                    02/24
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: {
                  xs: "block",
                  sm: "flex"
                },
                margin: {
                  xs: "0 auto",
                }
              }}
            >
              <Typography variant="h5">
                {project?.title}
              </Typography>
            </Box>

            <Box
              display="flex"
              gap={1}
              sx={{
                display: {
                  xs: "none",
                  sm: "flex"
                }
              }}
            >
              {project?.projectTag?.map((projectTag) => (
                <Box
                  display="flex"
                  gap={1}
                  key={projectTag.tag?.id}
                >
                  <Chip
                    label={projectTag?.tag?.name}
                    sx={{
                      fontSize: '1.3rem',
                      fontWeight: 400,
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          <CustomModal.Content>
            <Box marginTop={4}>
              <Box
                sx={{
                  backgroundImage: `url(${project.image})`,
                  marginBottom: 2,
                  objectFit: "cover",
                  backgroundSize: "cover",
                  width: "100%",
                  backgroundColor: "grey",
                  height: {
                    xs: "300px",
                    md: "586px",
                  }
                }}
              />
            </Box>

            <Box
              sx={{
                display: {
                  xs: "flex",
                  sm: "none"
                },
                justifyContent: "space-between",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
              >
                <Box>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </Box>

                <Box
                  display="flex"
                >
                  <Typography
                    variant="caption"
                  >
                    Bianca Martins • 02/24
                  </Typography>
                </Box>
              </Box>

              {project?.projectTag?.map((projectTag) => (
                <Box
                  display="flex"
                  gap={1}
                  key={projectTag.tag?.id}
                >
                  <Chip
                    label={projectTag?.tag?.name}
                    sx={{
                      fontSize: '1.3rem',
                      fontWeight: 400,
                    }}
                  />
                </Box>
              ))}
            </Box>
          </CustomModal.Content>
        </CustomModal.Title>

        <CustomModal.Actions>
          <Box
            display="flex"
            flexDirection="column"
            marginTop={3}
            gap={2}
          >
            <Box>
              {project?.description}
            </Box>

            <Box>
              <Box>
                Download
              </Box>
              <Box>
                <Link
                  href="/signup"
                  target="_blank"
                  underline="none"
                >
                  {project?.link ? project?.link : "Link indisponível"}

                </Link>
              </Box>
            </Box>
          </Box>
        </CustomModal.Actions>
      </Box>
    </CustomModal.Root >
  )
};

interface ProjectCardProps {
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
}: ProjectCardProps) {
  const [preview, setPreview] = useState(false);
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
    return;
  }

  return (
    <>
      <PreviewProject
        project={project}
        open={preview}
        handleClose={() => setPreview(false)}
      />
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
          onClick={() => setPreview(true)}
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
                alignItems: 'center',
                justifyContent: "center",
                gap: { xs: '8px' }
              }}>
                <Avatar
                  alt={project?.user?.name}
                  src={project?.user?.image}
                  sx={{ width: 24, height: 24 }}
                />
                <Typography variant="subtitle1" color={theme.colors.neutral120}>
                  {project?.user?.name}
                </Typography>
                <Typography variant="subtitle1" color={theme.colors.neutral120}>
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
        </Button >
        <EditButton
          visible={hasEditButton}
          projectId={project.id}
          project={project}
        />

      </Box >
    </>
  );
}