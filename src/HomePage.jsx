import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Box sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Bienvenido a tu Hub de BJJ
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        Organiza tus clases, gestiona la asistencia y mejora tu entrenamiento.
      </Typography>
      <Box mt={3}>
        <Button component={Link} to="/login" variant="contained" color="primary" sx={{ mr: 2 }}>
          Iniciar Sesión
        </Button>
        <Button component={Link} to="/signup" variant="outlined" color="primary">
          Registrarse
        </Button>
      </Box>
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary">
          Explora las diferentes secciones del Hub:
        </Typography>
        <Button component={Link} to="/dashboard/attendance" variant="text" sx={{ mr: 1 }}>
          Asistencia
        </Button>
        <Button component={Link} to="/dashboard/notes" variant="text" sx={{ mr: 1 }}>
          Notas de Clase
        </Button>
        <Button component={Link} to="/dashboard/timer" variant="text">
          Timer
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;