"use client"

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Google } from '@/components/Icons/Google';
import Image from 'next/image';

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Grid container sx={{ maxWidth: "xl" }}>
      <Grid item
        sx={{
          width: '60%',
          [theme.breakpoints.down("lg")]: {
            display: "none",
          }
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          minHeight="100vh"
        >
          <Image
            src="/signup.svg"
            alt="Orange Portfólio"
            width={549} height={832}
          />
        </Box>
      </Grid>

      <Grid
        item
        sx={{
          width: '40%',
          paddingRight: "1rem",
          [theme.breakpoints.down("lg")]: {
            width: "100%",
          }
        }}
      >
        <Container
          sx={{
            width: '100%',
            [theme.breakpoints.up("lg")]: {
              padding: "0px",
            }
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={4}
            minHeight="100vh"
          >
            <Typography
              variant="h5"
              color={theme.colors.primary90}
              sx={{
                [theme.breakpoints.up("lg")]: {
                  typography: "h3",
                  color: theme.colors.primary90
                },
              }}
            >
              Cadastre-se
            </Typography>

            <Box>

              <Box display='flex' gap={1} margin="normal" sx={{
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                  gap: 2
                }
              }}>
                <FormControl fullWidth>
                  <TextField id="name" aria-label="name" label="Nome" />
                </FormControl>

                <FormControl fullWidth>
                  <TextField id="lastName" aria-label="lastName" label="Sobrenome" />
                </FormControl>
              </Box>

              <FormControl fullWidth 
              sx={{
                marginTop: "1rem"
              }}>
                <TextField id="email" aria-label="email" label="Email address" />
              </FormControl>

              <FormControl variant="outlined" fullWidth               
              sx={{
                marginTop: "1rem"
              }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Password"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <Button variant="contained" fullWidth size="large"
                sx={{
                  color: theme.colors.neutral60,
                  backgroundColor: theme.colors.secondary100,
                  marginTop: "1rem",
                }}
              >
                Cadastrar
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  )
};


