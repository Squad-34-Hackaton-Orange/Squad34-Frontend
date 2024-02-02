"use client"

import { LoginContext } from "@/context/UserContext";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isLogged } = useContext(LoginContext);
    const router = useRouter();


    useEffect(() => {
      const token = Cookies.get("AccessToken");

      if (!isLogged && !token) {
        router.push("/login");
      }
    }, [isLogged]);


    if (!isLogged) {
      return null;
    }

    return <Component {...props} />;
  };
}