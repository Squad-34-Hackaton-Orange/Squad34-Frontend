"use client";

import React, { ReactNode, createContext, useState } from "react";
import { User, create, login } from "@/lib/api/user";
interface LoginContextProps {
  isLogged: boolean;
  user: User | null;
  signin: (email: string, senha: string) => Promise<any>;
  logout: () => void;
  signup: (name: string, last_name: string, email: string, password: string) => Promise<void>;
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

  const auth = async (email: string, password: string) => {
    const getUser = await login({ email, password });

    if (getUser) {
      setUser(getUser);
      setIsLogged(true);
    }

    return getUser;
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
  };

  const signup = async (name: string, last_name: string, email: string, password: string) => {
    await create({ name, last_name, email, password });
  };

  return (
    <LoginContext.Provider value={{ user, signin: auth, logout, isLogged, signup }}>
      {children}
    </LoginContext.Provider>
  );
};
