"use client";

import React, { ReactNode } from "react";
import { Box } from "@mui/material";

type ProjectsGridType = {
  children: ReactNode
};

const ProjectsGrid = ({ children }: ProjectsGridType) => {
  return (
    <Box sx={{
      width: '100%',
      mt: { xs: '24px', sm: '40px' },
      display: 'grid',
      gridTemplateColumns: {
        xs: '312px', sm: '389px', md: 'repeat(2, 389px)',
        lg: 'repeat(3, 389px)', xl: 'repeat(4, 389px)'
      },
      rowGap: { xs: '16px', sm: '24px' },
      gap: { xs: '16px', sm: '24px' },
      justifyContent: { xs: 'center', md: 'flex-start' },
      pb: '40px'
    }}>
      {children}
    </Box>
  );
};

export default ProjectsGrid;
