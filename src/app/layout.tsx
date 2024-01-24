import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import { LoginProvider } from "@/context/UserContext";

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
