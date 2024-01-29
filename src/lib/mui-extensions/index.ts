import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      [key: string]: string;
    };
  }

  interface ThemeOptions {
    colors?: {
      [key: string]: string;
    };
  }
}