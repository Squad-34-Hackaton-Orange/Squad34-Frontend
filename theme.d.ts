import '@mui/material/styles';

//Extending this MUI module
declare module '@mui/material/styles' {

    //Extending the Palette Interface inside of this module and declaring our changes
    interface Palette {
        colorSecondary100: string;
    }

}