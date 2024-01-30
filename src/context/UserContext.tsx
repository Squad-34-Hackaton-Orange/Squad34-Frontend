"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "@/lib/api/user";
import axios from "axios";

const usuarioLogin = {
  name: "Jhoe",
  last_name: "Doe",
  email: "jhoedoe@in.com",
  password: "123",
};

interface LoginContextProps {
  isLogged: boolean;
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export const LoginContext = createContext<LoginContextProps>({
  isLogged: false,
  user: null,
  login: async () => {},
  logout: () => {},
});

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, senha: string) => {
    // chamada da api
    // define o usuário
    //
    /*const getUser = await axios.post('', {
      email: email,
      password: senha
    })*/

    setUser(usuarioLogin);

    // if (getUser) {
    //   setIsLogged(true);
    // }
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
  };

  

  return (
    <LoginContext.Provider value={{ user, login, logout, isLogged }}>
      {children}
    </LoginContext.Provider>
  );
};
