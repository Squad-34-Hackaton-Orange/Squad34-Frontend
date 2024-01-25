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

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Grid container sx={{ maxWidth: "xl", margin: "0 auto" }}>
      <Grid item
        sx={{
          width: '40%',
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
            src="/login.svg"
            alt="Orange Portfólio"
            width={525} height={832}
          />
        </Box>
      </Grid>

      <Grid
        item
        sx={{
          width: '60%',
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
              Entre no Orange Portfólio
            </Typography>

            <Button startIcon={<Google />}
              sx={{
                display: "flex",
                gap: "1.5rem",
                padding: "0.6875rem",
                borderRadius: "0.125rem",
                textTransform: "none",
                boxShadow: " 0px 1px 1px 0px rgba(0, 0, 0, 0.17), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)",
                color: theme.colors.neutral100
              }}
            >
              Entrar com Google
            </Button>

            <Box>
              <Typography
                variant="subtitle1"
                color={theme.colors.neutral110}
                sx={{
                  [theme.breakpoints.up("lg")]: {
                    typography: "h5",
                  },
                }}
              >
                Faça login com email
              </Typography>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email" />
                <TextField id="email" aria-label="email" label="Email address" />
              </FormControl>

              <FormControl variant="outlined" fullWidth margin="normal">
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
                  margin: "1rem 0",
                }}
              >
                Entrar
              </Button>

              <Typography variant="subtitle1" color={theme.colors.neutral100}>
                Cadastre-se
              </Typography>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  )
};

