"use client";

import * as React from 'react';
import { useTheme, Theme } from '@mui/material/styles';
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
  Typography
} from '@mui/material';

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
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/, 'A senha deve conter ao menos um número, uma letra maiúscula, no mínimo oito dígitos e um caracter especial.Exemplo:@, *, &, !, etc.'),
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
          src="./images/signup.svg"
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
          <Typography
            sx={{
              marginBottom: 2,
              textAlign: "center",
              color: theme.colors.primary90,
              typography: {
                xs: "h5",
                lg: "h3",
              },
            }}
          >
            Cadastre-se
          </Typography>

          <Box>
            <Box display="flex" gap={1}>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="name" style={{ visibility: "hidden" }}>
                  Nome
                </InputLabel>
                <TextField
                  required
                  id="name"
                  name="name"
                  aria-label="name"
                  label="Nome"
                  value={formValues.name}
                  onChange={handleChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="lastName" style={{ visibility: "hidden" }}>
                  Sobrenome
                </InputLabel>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  aria-label="lastName"
                  label="Sobrenome"
                  value={formValues.lastName}
                  onChange={handleChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                />
              </FormControl>
            </Box>

            <FormControl fullWidth margin="normal">
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

            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel required htmlFor="password">
                Password
              </InputLabel>
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
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignUp;