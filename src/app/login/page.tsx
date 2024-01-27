"use client"

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { Google } from '@/components/Icons/Google';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  return (
    <Grid container columns={16}>
      <Grid
        item
        xs={6}
        sx={{
          display: { xs: "none", lg: "block" }
        }}
      >
        <img
          src="./images/login.svg"
          alt="Imagem de login com três pessoas e um computador"
          style={{
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>

      <Grid
        item
        xs={16}
        lg={10}
      >
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: { xs: "0 1rem" }
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              marginBottom: 5,
            }}
          >
            <Typography
              sx={{
                marginBottom: 4,
                color: theme.colors.primary90,
                typography: {
                  xs: "h5",
                  lg: "h3",
                },
              }}
            >
              Entre no Orange Portfólio
            </Typography>

            <Button startIcon={<Google />}
              sx={{
                gap: 2,
                textTransform: "none",
                boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.17), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)",
                color: theme.colors.neutral100
              }}
            >
              Entrar com Google
            </Button>
          </Box>

          <Box>
            <Typography
              color={theme.colors.neutral110}
              sx={{
                typography: {
                  xs: "subtitle1",
                  lg: "h5",
                },
              }}
            >
              Faça login com email
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel
                htmlFor="email"
                style={{ visibility: "hidden" }}
              >
                Email address
              </InputLabel>
              <TextField
                id="email"
                aria-label="email"
                label="Email address"
              />
            </FormControl>

            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel
                htmlFor="password"
              >
                Password
              </InputLabel>
              <OutlinedInput
                label="Password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Password"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                color: theme.colors.neutral60,
                backgroundColor: theme.colors.secondary100,
                margin: ".8rem 0",
              }}
            >
              Entrar
            </Button>

            <Link
              variant="subtitle1"
              href="/signup"
              underline="none"
              sx={{ color: theme.colors.neutral100 }}
            >
              Cadastre-se
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
};

