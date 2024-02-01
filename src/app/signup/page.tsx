"use client";

import React, { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginContext } from "@/context/UserContext";
import { Form } from "@unform/web";
import { VTextField } from "@/forms/VTextField";
import { VOutlinedInput } from "@/forms/VOutlinedInput";
import { useRouter } from "next/navigation";
import { User } from "@/lib/api/user";

export default function SignUp() {
  const { signup } = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async (data: User) => {
    if (!data.name || !data.last_name || !data.email || !data.password) {
      return;
    }

    try {
      setIsLoading(true);
      const createdUser = await signup(data.name, data.last_name, data.email, data.password);

      if (createdUser) {
        setNotification(true);

        setTimeout(() => {
          setNotification(false);
          setIsLoading(false);
          router.push("/login");
        }, 6000);
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      setIsLoading(false);
    }
  };

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

          <Box sx={{
            position: "absolute",
            top: "6rem",
            padding: "1rem",
            gap: 1,
          }}>
            {notification ? (
              <Alert variant="filled" severity="success"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Cadastro feito com sucesso. Você será redirecionado para o login.
              </Alert>
            ) : null}
          </Box>

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

          <Form
            onSubmit={(data) => handleSubmit(data)}
            placeholder="Cadastro">
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
                  <VTextField required name="name" id="name" aria-label="name" label="Nome" />
                </FormControl>

                <FormControl
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  sx={{ backgroundColor: "#fff" }}
                >
                  <InputLabel htmlFor="last_name" style={{ visibility: "hidden" }}>
                    Sobrenome
                  </InputLabel>
                  <VTextField
                    required
                    name="last_name"
                    id="last_name"
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
                <VTextField
                  required
                  name="email"
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
                <VOutlinedInput
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="password"
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

              <LoadingButton
                loading={isLoading}
                type="submit"
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
              </LoadingButton>
            </Box>
          </Form>
        </Box>
      </Grid>
    </Grid >
  );
}