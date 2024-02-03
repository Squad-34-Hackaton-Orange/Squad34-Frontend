"use client"

import React, { useContext } from "react";
import Header from "@/components/Header";
import { LoginContext } from "@/context/UserContext";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { user } = useContext(LoginContext);

  console.log(user);

  if (!user) {
    return;
  };

  return (
    <div>
      <Header user={user}
      />
      <main>{props.children}</main>
    </div>
  );
}
