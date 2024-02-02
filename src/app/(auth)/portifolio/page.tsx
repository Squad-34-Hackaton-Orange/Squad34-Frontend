"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProfileCard from "@/components/Cards/UserProfileCard";
import ProjectsGrid from "@/components/ProjectGrid";
import TagSearch from "@/components/Input/TagSearch";
import ProjectCard from "@/components/Cards/ProjectCard";
import isAuth from "@/components/isAuth";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "@/context/UserContext";
import { Project, get } from "@/lib/api/project";

function PortifolioView() {
  const { user } = useContext(LoginContext);
  const [projects, setProjects] = useState<Project[]>([]);
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
  }, [user.id])

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
          <ProfileCard />
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
          <ProjectsGrid>
            {projects?.map((project) => (
              <div key={project.id}>
                <ProjectCard
                  project={project}
                  hasTag={true}
                />
              </div>
            ))}
          </ProjectsGrid>
        </Box>
      </Box>
    </section>
  );
};

export default isAuth(PortifolioView);