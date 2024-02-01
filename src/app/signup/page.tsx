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
import { Form } from "@unform/web";
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { LoginContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { User } from "@/lib/api/user";
import { VTextField } from "@/components/forms/VTextField";
import { VOutlinedInput } from "@/components/forms/VOutlinedInput";

interface IFormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const formValidationSchema: yup.Schema<any> = yup.object().shape({
  name: yup
    .string().transform((originalValue) => {
      if (originalValue.trim() === '') {
        return null;
      }
      return originalValue;
    })
    .required("O nome é obrigatório")
    .max(50, "O nome deve conter no máximo cinquenta caracteres")
    .min(2, "O nome deve conter no mínimo dois caracteres")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/,
      "Digite um nome válido"
    ),
  lastName: yup
    .string().transform((originalValue) => {
      if (originalValue.trim() === '') {
        return null;
      }
      return originalValue;
    })
    .required("O sobrenome é obrigatório")
    .min(2, "O sobrenome deve conter no mínimo dois caracteres")
    .max(50, "O sobrenome deve conter no máximo cinquenta caracteres")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/,
      "Digite um nome válido"
    ),
  email: yup
    .string().transform((originalValue) => {
      if (originalValue.trim() === '') {
        return null;
      }
      return originalValue;
    })
    .required("O email é obrigatório")
    .email("Formato de email inválido")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Formato de email inválido"
    )
    .max(180, "O email deve conter no máximo 180 caracteres")
    .min(5, "O email deve conter no mínimo 5 caracteres"),
  password: yup
    .string().transform((originalValue) => {
      if (originalValue.trim() === '') {
        return null;
      }
      return originalValue;
    })
    .required("A senha é obrigatória")
    .min(8, "A senha deve conter pelo menos 8 caracteres")
    .max(16, "A senha deve conter no máximo 16 caracteres")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "A senha deve conter pelo menos um caractere especial"
    )
    .matches(
      /[A-Z]/,
      "A senha deve conter pelo menos uma letra maiúscula"
    ),
});


export default function SignUp() {
  const { signup } = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const theme = useTheme();
  const formRef = React.useRef<FormHandles>(null);

  // Validação de formulário com yup
  // const handleSubmit = async (data: IFormData) => {
  //   try {
  //     await formValidationSchema.validate(data, { abortEarly: false });
  //     console.log("Dados válidos:", data);
  //   } catch (errors: yup.ValidationError | any) {
  //     const validationErrors: { [key: string]: string } = {};

  //     errors.inner.forEach((error: any) => {
  //       if (!error.path) return;

  //       validationErrors[error.path] = error.message;
  //     });

  //     formRef.current?.setErrors(validationErrors);
  //   }
  // };

  const handleSubmit = async (data: User) => {
    if (!data) {
      return;
    }

    try {
      setIsLoading(true);
      await signup(data);
      setNotification(true);

      setTimeout(() => {
        setNotification(false);
        setIsLoading(false);
        router.push("/login");
      }, 6000);
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

                  <VTextField required id="name" name="name" aria-label="name" label="Nome" />

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

                  <VTextField
                    required
                    id="lastName"
                    name="lastName"
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

                <VTextField required id="email" name="email" aria-label="email" label="Email Address" />

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