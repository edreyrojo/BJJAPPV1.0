import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Stack, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // Importamos useTheme
import { grey } from '@mui/material/colors'; // Importamos grey para los estilos de hover

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme(); // Obtenemos el tema para usar sus colores

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    // Simulación de llamada al backend
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'usuario_nuevo') {
          reject({ message: 'El nombre de usuario ya existe' });
        } else {
          resolve({ message: 'Registro exitoso' });
        }
      }, 1500); // Simulación de latencia
    })
      .then(() => {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        navigate('/login');
      })
      .catch(err => {
        setError(err.message);
      });
  };

  // Estilos de botones para el botón "Registrarse" (negro)
  const signupButtonSx = {
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: grey[800],
    },
  };

  // Estilos para el enlace "Inicia Sesión"
  const loginLinkSx = {
    color: 'black', // O el color que desees para los enlaces
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: grey[700],
    },
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Registro
        </Typography>
        <form onSubmit={handleSignupSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Nombre de Usuario"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Correo Electrónico"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirmar Contraseña"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              sx={signupButtonSx} // Aplicamos los estilos del botón de registro
            >
              Registrarse
            </Button>
            <Typography variant="body2" align="center">
              ¿Ya tienes una cuenta? <RouterLink to="/login" style={loginLinkSx}>Inicia Sesión</RouterLink>
            </Typography>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}

export default Signup;