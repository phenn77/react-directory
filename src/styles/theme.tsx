import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Copperplate',
        },
        body1: {
            lineHeight: '30px',
            fontSize: '16px'
        },
        caption: {
            fontSize: '16px'
        }
    }
});