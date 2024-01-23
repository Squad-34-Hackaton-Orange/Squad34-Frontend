import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';

export default function About() {
  return (
    <Box>
      <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
        About Page
      </Typography>
      <Button variant="contained" component={NextLink} href="/">
        Go to the home page
      </Button>
    </Box>
  );
}
