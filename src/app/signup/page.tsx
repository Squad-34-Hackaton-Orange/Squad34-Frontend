"use client";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();

  return (
    <Grid
      container
      columns={16}
      sx={{
        overflow: "hidden",
        backgroundImage: { md: "url('./signup.svg')" },
        backgroundRepeat: { md: "no-repeat" },
        backgroundPosition: { md: "left" },
        backgroundSize: { md: "contain" },
        justifyContent: { md: "flex-end" },
      }}
    >
      {/* <Grid
        item
        xs={6}
        sx={{
          display: { xs: "none", lg: "block" }
        }}
      >
        <img
          src="./signup.svg"
          alt="Imagem de login com três pessoas e um computador"
          style={{
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid> */}

      <Grid item xs={16} md={8} xl={10}>
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
          <Typography
            sx={{
              marginBottom: 2,
              textAlign: "center",
              color: theme.colors.primary90,
              typography: {
                xs: "h4",
                sm: "h3",
                xl: "h2",
              },
            }}
          >
            Cadastre-se
          </Typography>

          <Box>
            <Box
              display="flex"
              gap={1}
              sx={{
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <FormControl
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "#fff" }}
              >
                <InputLabel htmlFor="name" style={{ visibility: "hidden" }}>
                  Nome
                </InputLabel>
                <TextField required id="name" aria-label="name" label="Nome" />
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "#fff" }}
              >
                <InputLabel htmlFor="lastName" style={{ visibility: "hidden" }}>
                  Sobrenome
                </InputLabel>
                <TextField
                  required
                  id="lastName"
                  aria-label="name"
                  label="Sobrenome"
                />
              </FormControl>
            </Box>

            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "#fff" }}
            >
              <InputLabel htmlFor="email" style={{ visibility: "hidden" }}>
                Email
              </InputLabel>
              <TextField
                required
                id="email"
                aria-label="email"
                label="Email Address"
              />
            </FormControl>

            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "#fff" }}
            >
              <InputLabel required htmlFor="password">
                Password
              </InputLabel>
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
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
