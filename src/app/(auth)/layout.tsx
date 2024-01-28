import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import Header from '@/components/Header';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <main>{props.children}</main>
            
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
