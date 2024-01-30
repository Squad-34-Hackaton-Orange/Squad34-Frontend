'use client'
import { useContext, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { TextField, Box, Link } from '@mui/material';
import { LoginContext } from '@/context/UserContext';

export default function Home() {
  const { user, login } = useContext(LoginContext);

  // Return early no caso do usuário não existir
  if (!user) {
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
        <p>User not available</p>
      </>
    );
  }

  // Continue with rendering the rest of the component
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

      <h1>{user.name}</h1>

      <button type="button" onClick={() => login("aaaa", "123")}>
        Enviar
      </button>
    </>
  );
}
