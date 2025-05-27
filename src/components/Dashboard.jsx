import React from 'react';
import { Typography, Box, Button, Stack } from '@mui/material';
import { Link, Outlet, Routes, Route, useNavigate } from 'react-router-dom';
import AttendanceModule from './dashboard/AttendanceModule';
import ClassNotesModule from './dashboard/ClassNotesModule';
import TimerModule from './dashboard/TimerModule';
import { grey } from '@mui/material/colors'; // Importa grey para los colores hover

function Dashboard() {
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        mt: 5,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      {/* Añadir la imagen aquí */}
      <img
        src="/panel.png"  // Asegúrate de que la ruta sea correcta
        alt="Logo del Dashboard"
        style={{
          maxWidth: '200px', // Ajusta el tamaño según sea necesario
          marginBottom: '20px', // Espacio debajo de la imagen
        }}
      />
      {authToken ? (
        <Typography>Usuario autenticado.</Typography>
      ) : (
        <Typography color="error">No estás autenticado.</Typography>
      )}
      <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
        {/* Botón de Asistencia */}
        <Button
          component={Link}
          to="/dashboard/attendance"
          variant="contained"
          sx={{
            backgroundColor: 'black', // Fondo negro
            color: 'white',         // Texto blanco
            '&:hover': {
              backgroundColor: grey[800], // Un gris oscuro al pasar el ratón
            },
          }}
        >
          Asistencia
        </Button>
        {/* Botón de Notas de Clase */}
        <Button
          component={Link}
          to="/dashboard/class-notes"
          variant="contained"
          sx={{
            backgroundColor: 'black', // Fondo negro
            color: 'white',         // Texto blanco
            '&:hover': {
              backgroundColor: grey[800], // Un gris oscuro al pasar el ratón
            },
          }}
        >
          Notas de Clase
        </Button>
        {/* Botón de Timer */}
        <Button
          component={Link}
          to="/dashboard/timer"
          variant="contained"
          sx={{
            backgroundColor: 'black', // Fondo negro
            color: 'white',         // Texto blanco
            '&:hover': {
              backgroundColor: grey[800], // Un gris oscuro al pasar el ratón
            },
          }}
        >
          Timer
        </Button>
        {/* Botón de Cerrar Sesión */}
        <Button
          variant="outlined"
          color="primary" // Puedes mantener 'primary' o cambiarlo a un estilo personalizado si el contorno no es negro
          onClick={handleLogout}
          sx={{
            ml: 2,
            borderColor: 'black', // Borde negro para el botón outlined
            color: 'black',       // Texto negro para el botón outlined
            '&:hover': {
              backgroundColor: grey[200], // Un gris claro al pasar el ratón para el outlined
              borderColor: grey[800],
            },
          }}
        >
          Cerrar Sesión
        </Button>
      </Stack>
      <Routes>
        <Route path="attendance" element={<AttendanceModule />} />
        <Route path="class-notes" element={<ClassNotesModule />} />
        <Route path="timer" element={<TimerModule />} />
      </Routes>
      <Outlet />
    </Box>
  );
}

export default Dashboard;