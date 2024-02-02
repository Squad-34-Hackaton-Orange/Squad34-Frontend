"use client";

import React, { useContext, useEffect, useState, useRef } from "react";

import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";
import { LoginContext } from "@/context/UserContext";
import { Form } from "@unform/web";
import { User } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { VTextField } from "@/components/forms/VTextField";
import { VOutlinedInput } from "@/components/forms/VOutlinedInput";

import * as yup from 'yup';

const formValidationSchema: yup.Schema<any> = yup.object().shape({
  email: yup.string().transform((originalValue) => {
    if (originalValue.trim() === '') {
      return null;
    }
    return originalValue;
  })
    .min(5, 'A email deve ter pelo menos 5 caracteres')
    .max(180, 'A senha deve ter no máximo 180 caracteres')
    .required('O email é obrigatório')
    .email('Insira um email válido'),
  password: yup
    .string().transform((originalValue) => {
      if (originalValue.trim() === '') {
        return null;
      }
      return originalValue;
    })
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .max(16, 'A senha deve ter no máximo 16 caracteres')
    .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'A senha deve conter pelo menos um caractere especial'
    )
    .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .required('A senha é obrigatória'),
});

export default function Login() {
  const { signin, isLogged } = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async (data: User) => {
    if (!data) {
      return;
    }

    try {
      setIsLoading(true);
      await signin(data);

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLogged) {
      setIsLoading(false);
      router.push("/portifolio");
    };
  }, [isLogged])

  return (
    <Grid
      container
      columns={16}
      sx={{
        overflow: "hidden",
        backgroundImage: { md: "url('/images/login.svg')" },
        backgroundRepeat: { md: "no-repeat" },
        backgroundPosition: { md: "left" },
        backgroundSize: { md: "contain" },
        justifyContent: { md: "flex-end" },
      }}
    >
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
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
              <GoogleLogin
                onSuccess={(response) => {
                  let decode = jwtDecode(response.credential as string);
                  return decode;
                  // console.log(decode);
                }}
                onError={() => console.log("Failed")}
              />
            </GoogleOAuthProvider>
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

            <Form onSubmit={(data) => handleSubmit(data)} placeholder="Login">
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
                  Email
                </InputLabel>
                <VTextField required name="email" id="email" aria-label="email" label="Email" />
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "#fff" }}
                required
              >
                <VOutlinedInput
                  name="password"
                  label="Senha"
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
                Entrar

              </LoadingButton>
            </Form>

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