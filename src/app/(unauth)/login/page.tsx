"use client";

import React, { useState } from "react";
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
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Google } from "@/components/Icons/Google";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  return (
    <Grid
      container
      columns={16}
      sx={{
        overflow: "hidden",
        backgroundImage: { md: "url('./login.svg')" },
        backgroundRepeat: { md: "no-repeat" },
        backgroundPosition: { md: "left" },
        backgroundSize: { md: "contain" },
        justifyContent: { md: "flex-end" },
      }}
    >
      {/* <Grid
        item
        xs={6}
        md={8}
        alignItems="flex-start"
        sx={{
          display: { xs: "none", md: "flex" }, //mudei do LG para o MD
        }}
      >
        {/* <img
          src="./login.svg"
          alt="Imagem de login com três pessoas e um computador"
          style={{                  
            
            minHeight: "100vh",                      
            height: "100vh",
            width: "100%",  //82.03125%
            maxWidth: "525px",
            objectFit: "cover",
            objectPosition: "left 0"
            
            
            // backgroundRepeat: "no-repeat",
            // backgroundSize: "cover",
            // backgroundPosition: "center",            
          }}
        /> 
      </Grid> */}

      <Grid
        item
        xs={16}
        md={8}
        xl={10}
        sx={{
          backgroundColor: "#ffffff00",
        }}
      >
        <Box
          sx={{
            minHeight: "100vh",
            maxWidth: "80.78125%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
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
                whiteSpace: "nowrap",
                typography: {
                  xs: "h4",
                  sm: "h3",
                  xl: "h2",
                },
              }}
            >
              Entre no Orange Portfólio
            </Typography>

            <Button
              startIcon={<Google />}
              size="large"
              sx={{
                gap: 2,
                textTransform: "none",
                boxShadow:
                  "0px 1px 1px 0px rgba(0, 0, 0, 0.17), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)",
                color: theme.colors.neutral100,
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
                  sm: "h5",
                  xl: "h4",
                },
              }}
            >
              Faça login com email
            </Typography>

            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "#fff" }}
              required
            >
              <InputLabel
                htmlFor="email"
                style={{
                  visibility: "hidden",
                }}
              >
                Email Address
              </InputLabel>
              <TextField id="email" aria-label="email" label="Email Address" />
            </FormControl>

            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "#fff" }}
              required
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
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
  );
}
