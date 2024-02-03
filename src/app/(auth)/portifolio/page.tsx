"use client";

import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProfileCard from "@/components/Cards/UserProfileCard";
import ProjectsGrid from "@/components/ProjectGrid";
import TagSearch from "@/components/Input/TagSearch";
import ProjectCard from "@/components/Cards/ProjectCard";
import isAuth from "@/components/isAuth";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "@/context/UserContext";
import { Project, get } from "@/lib/api/project";
import CollectionsIcon from '@mui/icons-material/Collections';
import AddProjectModal from "@/components/forms/AdicionarProjeto";

function PortifolioView() {
  const { user } = useContext(LoginContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();


  if (!user) {
    return;
  }

  useEffect(() => {
    const fetchProjects = async () => {
      const getAllUserProject = await get({ id: String(user.id) });
      setProjects(getAllUserProject);
    };

    fetchProjects();
  }, [user.id]);

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
          <ProfileCard
            userImage={
              projects[0]?.user
            }
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: theme.colors.neutral130,
              mb: "16px",
              opacity: "0.6",
            }}
          >
            Meus projetos
          </Typography>
          <TagSearch />
          {
            projects.length > 0 ? (
              <ProjectsGrid>
                {projects?.map((project) => (
                  <div key={project.id}>
                    <ProjectCard
                      hasEditButton={true}
                      project={project}
                      hasTag={true}
                    />
                  </div>
                ))}
              </ProjectsGrid>
            ) : (
              <Button
                variant="text"
                onClick={() => setModalOpen(true)}
                sx={{
                  height: "250px",
                  width: "320px",
                  background: theme.colors.neutral70,
                  marginTop: 6
                }}
              >
                <Box>
                  <CollectionsIcon
                    sx={{
                      fontSize: 40,
                      color: theme.colors.neutral120,
                      marginBottom: 2
                    }}
                  />

                  <Typography
                    sx={{
                      color: theme.colors.neutral120,
                      marginBottom: 2,
                      textTransform: "none"
                    }}
                  >
                    Adicione seu primeiro projeto
                  </Typography>

                  <Typography
                    sx={{
                      color: theme.colors.neutral120,
                      textTransform: "none"
                    }}
                  >
                    Compartilhe seu talento com milhares de pessoas
                  </Typography>
                </Box>
              </Button>
            )
          }
        </Box>
      </Box>
      <AddProjectModal open={modalOpen} setOpen={setModalOpen} />
    </section>
  );
};

export default isAuth(PortifolioView);