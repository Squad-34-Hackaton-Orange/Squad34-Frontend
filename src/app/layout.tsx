import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/styles/theme";
import { LoginProvider } from "@/context/UserContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Portifólio',
  description:
    'Programa de Formação FCAMARA v5',
};


export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <LoginProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {props.children}
            </ThemeProvider>
          </LoginProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
