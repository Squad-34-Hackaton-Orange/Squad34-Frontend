"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import { User, create, login } from "@/lib/api/user";
import { jwtDecode } from "jwt-decode";
import { Token } from "@/lib/api/token";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
interface LoginContextProps {
  isLogged: boolean;
  user: User | null;
  signin: (data: User) => Promise<void>;
  logout: () => void;
  signup: (data: User) => Promise<void>;
}

export const LoginContext = createContext<LoginContextProps>({
  isLogged: false,
  user: null,
  signin: async () => { },
  logout: () => { },
  signup: async () => { },
});
interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const signin = async (data: User) => {
    try {
      const validateLogin = await login(data);

      if (validateLogin) {
        const token = validateLogin.token;

        console.log({ token });

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
      console.error(error)
    }
  };

  const logout = () => {
    try {
      Cookies.remove("AccessToken");
      setUser(null);
      setIsLogged(false);
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

  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, [isLogged]);

  const signup = async (data: User) => {
    await create(data);
  };

  return (
    <LoginContext.Provider value={{ user, signin, logout, isLogged, signup }}>
      {children}
    </LoginContext.Provider>
  );
};
