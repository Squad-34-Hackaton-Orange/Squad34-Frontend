"use client";

import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
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

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { object, string, InferType } from 'yup';
import { Google } from '@/components/Icons/Google';
import * as yup from 'yup';

// Defina os tipos para os valores do formulário e erros
interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

// Defina os tipos para as props do componente
interface LoginProps {
  // Adicione qualquer prop específica, se necessário
}
//PERGUNTAR SE VAI PRECISAR MUDAR PASSWORD INVÁDIDA COM OS CARACTERES DE PARÂMETRO OU SE VAI COMPARAR COM O BANCO DE DADOS
const userSchema = object({
  email: string().required().email(),
  password: string()
    .required()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/, 'A senha deve conter ao menos um número, uma letra maiúscula, no mínimo oito dígitos e um caracter especial.Exemplo:@, *, &, !, etc.'),
});

const Login: React.FC<LoginProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  // Estados locais para armazenar valores dos campos e erros
  const [formValues, setFormValues] = React.useState<FormValues>({
    email: '',
    password: '',
  });  

  const [formErrors, setFormErrors] = React.useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await userSchema.validate(formValues, { abortEarly: false });
      setFormErrors({});
      console.log('Formulário enviado com valores:', formValues);
    } catch (errors) {
      if (errors instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        errors.inner.forEach((error: yup.ValidationError) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setFormErrors(validationErrors);
        console.error('Erro de validação:', errors);
      }
    }
  };

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
                Endereço de email
              </InputLabel>
              <TextField
                required
                id="email"
                name="email"
                aria-label="email"
                label="Email Address"
                value={formValues.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
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
                name="password"
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
                value={formValues.password}
                onChange={handleChange}
                error={!!formErrors.password}
              />
              {formErrors.password && (
                <Typography variant="caption" color="error">
                  {formErrors.password}
                </Typography>
              )}
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
              onClick={handleSubmit}
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

export default Login;
