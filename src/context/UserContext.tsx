"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import { User, create, login } from "@/lib/api/user";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
interface LoginContextProps {
  isLogged: boolean;
  user: User | null;
  signin: (data: User) => Promise<void>;
  logout: () => void;
  signup: (data: User) => Promise<void>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const LoginContext = createContext<LoginContextProps>({
  isLogged: false,
  user: null,
  signin: async () => { },
  logout: () => { },
  signup: async () => { },
  isLoading: false,
  setIsLoading: () => { },
});
interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signin = async (data: User) => {
    try {
      const validateLogin = await login(data);

      if (validateLogin) {
        const token = validateLogin.token;

        if (token) {
          Cookies.set("AccessToken", token, {
            expires: 60 * 60 * 1000,
            secure: true,
            sameSite: 'Lax',
          });
          const decoded = jwtDecode<User>(token);
          setUser(decoded);
          setIsLogged(true);
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      Cookies.remove("AccessToken");
      setUser(null);
      setIsLogged(false);
      router.push("/");
    } catch (error) {
      console.error(error)
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
    await create(data);
  };

  return (
    <LoginContext.Provider value={{ user, signin, logout, isLogged, signup, isLoading, setIsLoading }}>
      {children}
    </LoginContext.Provider>
  );
};
