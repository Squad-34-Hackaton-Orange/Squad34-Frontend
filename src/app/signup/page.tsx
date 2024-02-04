"use client";

import React, { useContext, useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Form } from "@unform/web";
import * as yup from "yup";
import { LoginContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { User } from "@/lib/api/user";
import { VTextField } from "@/components/forms/VTextField";
import { VOutlinedInput } from "@/components/forms/VOutlinedInput";

const transformString = (originalValue: string) => {
  return originalValue.trim() === "" ? null : originalValue;
};

const formValidationSchema: yup.Schema<any> = yup.object().shape({
  name: yup
    .string()
    .transform(transformString)
    .required("O nome é obrigatório")
    .max(50, "O nome deve conter no máximo cinquenta caracteres")
    .min(2, "O nome deve conter no mínimo dois caracteres")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/, "Digite um nome válido"),
  last_name: yup
    .string()
    .transform(transformString)
    .required("O sobrenome é obrigatório")
    .min(2, "O sobrenome deve conter no mínimo dois caracteres")
    .max(50, "O sobrenome deve conter no máximo cinquenta caracteres")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/, "Digite um nome válido"),
  email: yup
    .string()
    .transform(transformString)
    .required("O email é obrigatório")
    .email("Formato de email inválido")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Formato de email inválido")
    .max(180, "O email deve conter no máximo 180 caracteres")
    .min(5, "O email deve conter no mínimo 5 caracteres"),
  password: yup
    .string()
    .transform(transformString)
    .required("A senha é obrigatória")
    .min(8, "A senha deve conter pelo menos 8 caracteres")
    .max(16, "A senha deve conter no máximo 16 caracteres")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "A senha deve conter pelo menos um caractere especial"
    )
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula"),
});

export default function SignUp() {
  const { signup, setIsSignupLoading, isSignupLoading } =
    useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const formRef = useRef();

  const handleSubmit = async (data: User) => {
    try {
      // @ts-ignore
      formRef?.current?.setErrors({});

      await formValidationSchema.validate(data, {
        abortEarly: false,
      });

      setIsSignupLoading(true);
      await signup(data);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          // @ts-ignore
          validationErrors[error?.path] = error.message;
        });
        // @ts-ignore
        formRef.current.setErrors(validationErrors);
      }
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
          // @ts-ignore
            ref={formRef}
            onSubmit={(data) => handleSubmit(data)}
            placeholder="Cadastro"
          >
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

                  <VTextField
                    required
                    id="name"
                    name="name"
                    aria-label="name"
                    label="Nome"
                  />
                </FormControl>

                <FormControl
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  sx={{ backgroundColor: "#fff" }}
                >
                  <InputLabel
                    htmlFor="last_name"
                    style={{ visibility: "hidden" }}
                  >
                    Sobrenome
                  </InputLabel>

                  <VTextField
                    required
                    id="last_name"
                    name="last_name"
                    aria-label="last_name"
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
                  name="email"
                  id="email"
                  aria-label="email"
                  label="Email"
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
                loading={isSignupLoading}
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
            <Link
              variant="subtitle1"
              href="/login"
              underline="none"
              sx={{ color: theme.colors.neutral100 }}
            >
              Já tem uma conta? Faça login
            </Link>
          </Form>
        </Box>
      </Grid>
    </Grid>
  );
}
