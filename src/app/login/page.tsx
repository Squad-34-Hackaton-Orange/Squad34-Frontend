"use client";

import React, { useContext, useState } from "react";
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

<<<<<<< HEAD
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
=======
import { useTheme } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";
import { LoginContext } from "@/context/UserContext";
import { Form } from "@unform/web";
import { VTextField } from "@/forms/VTextField";
import { VOutlinedInput } from "@/forms/VOutlinedInput";
import { User } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";

export default function Login() {
  const { signin, user } = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const theme = useTheme();

  console.log(user);

  const handleSubmit = async (data: User) => {
    if (!data.email || !data.password) {
      return;
    }

    try {
      setIsLoading(true);
      const userExist = await signin(data.email, data.password);

      if (userExist) {
        setIsLoading(false);
        router.push("/portifolio")
      };

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
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
=======
  console.log(user);

  const handleSubmit = async (data: User) => {
    if (!data.email || !data.password) {
      return;
    }

    try {
      setIsLoading(true);
      const userExist = await signin(data.email, data.password);

      if (userExist) {
        setIsLoading(false);
        router.push("/portifolio")
      };

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setIsLoading(false);
>>>>>>> develop
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
                  console.log(decode);
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
                  Email Address
                </InputLabel>
                <VTextField name="email" id="email" aria-label="email" label="Email Address" />
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
  )
};

export default Login;
