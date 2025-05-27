import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    // AÑADE ESTA LÍNEA PARA FORZAR EL MODO CLARO
    mode: 'light', 

    primary: {
      main: grey[300], // Un gris claro como primario
      light: grey[100],
      dark: grey[500],
      contrastText: '#424242', // Texto oscuro para contraste
    },
    secondary: {
      main: '#a7ffeb', // Un verde menta suave
      light: '#e0ffff',
      dark: '#64cbac',
      contrastText: '#424242',
    },
    background: {
      default: '#fff', // Cambiado a blanco puro
      paper: '#fff', // Blanco para los contenedores
    },
    text: {
      primary: grey[800], // Texto primario más oscuro
      secondary: grey[600], // Texto secundario un poco más claro
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // Fuente elegante y legible
    h6: {
      fontWeight: 400, // Menos negrita para los títulos
      fontSize: '1.1rem',
    },
    subtitle1: {
      fontSize: '0.9rem',
      color: grey[700],
    },
    body1: {
      fontSize: '0.9rem',
    },
    button: {
      fontWeight: 400,
      textTransform: 'none', // Evitar mayúsculas en los botones
    },
  },
  shape: {
    borderRadius: 8, // Bordes redondeados
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Botones más redondeados
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: grey[300],
          color: '#424242',
          '&:hover': {
            backgroundColor: grey[400],
          },
        },
        containedSecondary: {
          backgroundColor: '#a7ffeb',
          color: '#424242',
          '&:hover': {
            backgroundColor: '#cfffde',
          },
        },
        outlinedPrimary: {
          borderColor: grey[300],
          color: grey[800],
          '&:hover': {
            borderColor: grey[400],
            backgroundColor: grey[100],
          },
        },
        outlinedSecondary: {
          borderColor: '#a7ffeb',
          color: grey[800],
          '&:hover': {
            borderColor: '#cfffde',
            backgroundColor: '#e0ffff',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff', // Barra de navegación blanca
          color: grey[800],
          boxShadow: '0px 1px 3px rgba(0,0,0,0.05)', // Sombra muy suave
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0,0,0,0.03)', // Sombra suave para los contenedores
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined', // Usar el estilo outlined por defecto
        size: 'small',
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: 'small',
      },
    },
  },
});

export default theme;