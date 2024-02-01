"use client";

<<<<<<< HEAD
import * as React from "react";
import { useTheme, Theme } from "@mui/material/styles";
=======
import React, { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import LoadingButton from '@mui/lab/LoadingButton';
>>>>>>> develop
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

<<<<<<< HEAD
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { object, string, InferType } from 'yup';
import * as yup from 'yup';


// Defina os tipos para os valores do formulário e erros
interface FormValues {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

// Defina os tipos para as props do componente
interface SignUpProps {
  // Adicione qualquer prop específica, se necessário
}

const userSchema = object({
  name: string().required().matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Digite um nome válido (apenas letras)'),
  lastName: string().required().matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Digite um nome válido (apenas letras)'),
  email: string().required().email(),
  password: string()
    .required()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/, 'Deve conter ao menos um número, uma letra maiúscula, no mínimo oito dígitos e um caracter especial.'),
});

const SignUp: React.FC<SignUpProps> = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const theme: Theme = useTheme();

  // Estados locais para armazenar valores dos campos e erros
  const [formValues, setFormValues] = React.useState<FormValues>({
    name: '',
    lastName: '',
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
=======
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
>>>>>>> develop

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
<<<<<<< HEAD
                  id="lastName"
                  name="lastName"
                  aria-label="lastName"
                  label="Sobrenome"
                  value={formValues.lastName}
                  onChange={handleChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
=======
                  name="email"
                  id="email"
                  aria-label="email"
                  label="Email Address"
>>>>>>> develop
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
<<<<<<< HEAD

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
              Cadastrar
            </Button>
          </Box>
=======
          </Form>
>>>>>>> develop
        </Box>
      </Grid>
    </Grid >
  );
}

export default SignUp;