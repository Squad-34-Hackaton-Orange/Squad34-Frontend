"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import { User, create, login } from "@/lib/api/user";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
interface LoginContextProps {
  isLogged: boolean;
  user: User | null;
  signin: (data: User) => Promise<void>;
  logout: () => void;
  signup: (data: User) => Promise<void>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isSignupLoading: boolean;
  setIsSignupLoading: (loading: boolean) => void;
  notification: boolean;
  setNotification: (notification: boolean) => void;
}

export const LoginContext = createContext<LoginContextProps>({
  isLogged: false,
  user: null,
  signin: async () => { },
  logout: () => { },
  signup: async () => { },
  isLoading: false,
  setIsLoading: () => { },
  isSignupLoading: false,
  setIsSignupLoading: () => { },
  notification: false,
  setNotification: () => { },
});
interface LoginProviderProps {
  children: ReactNode;
};

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [isSignupError, setIsSignupError] = useState(false);
  const [notification, setNotification] = useState(false);
  const router = useRouter();

  const signin = async (data: User) => {
    const { token } = data;

    if (token) {
      try {
        Cookies.set("AccessToken", token, {
          expires: 60 * 60 * 1000,
          secure: true,
          sameSite: "Lax",
        });

        const decoded = jwtDecode(token);
        setUser(decoded as User);
        setIsLogged(true);
        return;
      } catch (error) {
        setIsLoading(false);
        setIsLoginError(true);
        setTimeout(() => {
          setIsLoginError(false);
        }, 4000);
      }
    }

    try {
      const validateLogin = await login(data);

      if (validateLogin) {
        const validateToken = validateLogin.token;

        if (validateToken) {
          Cookies.set("AccessToken", validateToken, {
            expires: 60 * 60 * 1000,
            secure: true,
            sameSite: "Lax",
          });

          const decoded = jwtDecode<User>(validateToken);
          setUser(decoded);
          setIsLogged(true);
          return;
        }
      }
    } catch (error) {
      setIsLoading(false);
      setIsLoginError(true);
      setTimeout(() => {
        setIsLoginError(false);
      }, 4000);
    }
  };

  const logout = () => {
    try {
      Cookies.remove("AccessToken");
      setUser(null);
      setIsLogged(false);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("AccessToken");

    if (token) {
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
      setIsLogged(true);
    }
  }, []);

  const signup = async (data: User) => {
    try {
      setIsSignupLoading(true);
      await create(data);
      setIsSignupLoading(false);
      setNotification(true);

      setTimeout(() => {
        setNotification(false);
        router.push("/login");
      }, 3000);

    } catch (error) {
      setIsSignupLoading(false);
      setIsSignupError(true);
      setTimeout(() => {
        setIsSignupError(false);
      }, 4000);
    }
  };

  return (
    <>
      {
        isLoginError && (
          <Alert
            variant="filled"
            severity="error"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: 2,
            }}
          >
            Erro ao fazer login. Verifique seu e-mail e sua senha.
          </Alert>
        )
      }

      {
        isSignupError && (
          <Alert
            variant="filled"
            severity="error"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: 2,
            }}
          >
            Erro ao fazer cadastro. Verifique os campos e tente novamente.
          </Alert>
        )
      }

      {notification && (
        <Alert variant="filled" severity="success"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: 2,
          }}
        >
          Cadastro feito com sucesso. Você será redirecionado para o login.
        </Alert >
      )}

      <LoginContext.Provider value={{
        user,
        signin,
        logout,
        isLogged,
        signup,
        isLoading,
        setIsLoading,
        notification,
        setNotification,
        isSignupLoading,
        setIsSignupLoading,
      }}>
        {children}
      </LoginContext.Provider>
    </>
  );
};
