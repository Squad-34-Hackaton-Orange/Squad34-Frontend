import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { TextField } from '@mui/material';

export default function Home() {
  return (
    <>
      <Box>
        <Typography variant="h4" component="h1">
          Home Page
        </Typography>
        <Link href="/about" color="secondary" component={NextLink}>
          Go to the about page
        </Link>
      </Box>

      <Box>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Box>
    </>
  );
}
