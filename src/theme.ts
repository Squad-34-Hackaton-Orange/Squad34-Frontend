"use client";

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600, //tablet
      md: 900, // notebook
      lg: 1200, // small desktop
      xl: 1536, // desktop 
    },    
  },  
  colors: {
    primary70: "#EDEFF2",
    primary80: "#444466",
    primary90: "#222244",
    primary100: "#111133",
    secondary60: "#FFEECC",
    secondary70: "#FFCC99",
    secondary80: "#FFAA66",
    secondary90: "#FF8833",
    secondary100: "#FF5522",
    secondary110: "#CC4400",
    secondary120: "#993300",
    secondary130: "#662200",
    neutral60: "#FCFDFF",
    neutral70: "#E6E9F2",
    neutral80: "#C2C4CC",
    neutral90: "#A1A3AA",
    neutral100: "#818388",
    neutral110: "#515255",
    neutral120: "#303133",
    neutral130: "#0B0C0D",
    success60: "#EEFFBB",
    success70: "#BBEE88",
    success80: "#88CC66",
    success90: "#55BB44",
    success100: "#229922",
    success110: "#118822",
    success120: "#006622",
    success130: "#004422",
    alert60: "#FFFFCC",
    alert70: "#FFEE99",
    alert80: "#FFEE66",
    alert90: "#FFDD33",
    alert100: "#FFCC00",
    alert110: "#CC9900",
    alert120: "#997700",
    alert130: "#664400",
    error60: "#FFDDCC",
    error70: "#FFAA99",
    error80: "#FF7766",
    error90: "#FF4433",
    error100: "#DD0000",
    error110: "#BB0000",
    error120: "#880000",
    error130: "#660000",
    info60: "#ADCBFA",
    info70: "#82A9F0",
    info80: "#608AE1",
    info90: "#315FCE",
    info100: "#2348B1",
    info110: "#183594",
    info120: "#0F2477",
    info130: "#091862",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
        },
        html: {
          width: "100%",
          minHeight: "100vh",
          // TODO: RESETAR O TAMANHO PARA 10 PX OU 62,75%
        }
      },
    },
    MuiTextField: {
      styleOverrides: {        
        root: {
          fontSize: "60px",
        } 

      }
    }
  }
});

export default theme;
