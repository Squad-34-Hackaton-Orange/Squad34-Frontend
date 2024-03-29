"use client"

import ProjectCard from "@/components/Cards/ProjectCard";
import TagSearch from "@/components/Input/TagSearch";
import ProjectsGrid from "@/components/ProjectGrid";
import isAuth from "@/components/isAuth";
import { LoginContext } from "@/context/UserContext";
import { Project, list } from "@/lib/api/project";
import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

function DiscoverView() {
  const { user } = useContext(LoginContext);
  const theme = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);

  if (!user) {
    return;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await list({ id: user.id });
      setProjects(projects);
    };

    fetchProjects();
  }, []);
  

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
          <Typography variant="h4" textAlign="center">
            Junte-se à comunidade de inovação, inspiração e descobertas, transformando experiências em conexões inesquecíveis
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            marginTop: 6,
          }}
        >
          <TagSearch />
          <ProjectsGrid>
            {
              projects.length > 0 ? (
                <>
                  {projects?.map((project) => (
                    <div key={project.id}>
                      <ProjectCard
                        hasEditButton={false}
                        project={project}
                        hasTag={false}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <Typography
                  variant="subtitle1"
                  sx={{
                    marginTop: 6,
                    color: theme.colors.neutral130,
                    opacity: "0.6",
                  }}
                >
                  Nenhum projeto encontrado
                </Typography>
              )
            }
          </ProjectsGrid>
        </Box>
      </Box>
    </section>
  );
};

export default isAuth(DiscoverView);