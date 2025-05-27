// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import './animaciones.css';
import './botones.css';

// Importa los nuevos proveedores de contexto
import { CasualTimerProvider } from './contexts/CasualTimerContext';
import { CompetitionTimerProvider } from './contexts/CompetitionTimerContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        }}
        className="color-change-2x" // Clase para el fondo animado
      >
        {/* Envuelve tus rutas con ambos proveedores */}
        <CasualTimerProvider>
          <CompetitionTimerProvider>
            <Routes>
              {/* Redirige la ruta raíz "/" a "/login" */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup/*" element={<Signup />} />
              {/* No necesitas una ruta directa para TimerModule aquí si se renderiza dentro de Dashboard */}
            </Routes>
          </CompetitionTimerProvider>
        </CasualTimerProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;