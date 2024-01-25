"use client"

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Home() {
  const theme = useTheme();

  return (
    <Container fixed>
      <Typography variant="h4" component="h1">
        Home Page
      </Typography>
      <Link href="/about" color={theme.status.danger} component={NextLink}>
        Go to the about page
      </Link>
    </Container>
  );
}
