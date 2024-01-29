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

// PARA ADICIONAR A TYPOGRAPHY NOVA QUE ESTÁ NO FIGMA
declare module '@mui/material/styles' {
  interface TypographyVariants {
    label: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    label?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label?: true;
  }
}


