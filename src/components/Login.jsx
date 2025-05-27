import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Stack, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // Importamos useTheme
import { grey } from '@mui/material/colors'; // Importamos grey para los estilos de hover

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme(); // Obtenemos el tema para usar sus colores

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setError('');
    // Simulación de llamada al backend
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'root' && password === 'toor') {
          resolve({ token: 'mi_token_secreto' }); // Simulación de token
        } else {
          reject({ message: 'Credenciales incorrectas' });
        }
      }, 1500); // Simulación de latencia de 1.5 segundos
    })
      .then(data => {
        localStorage.setItem('authToken', data.token); // Almacenar el token
        navigate('/dashboard'); // Redirigir
      })
      .catch(err => {
        setError(err.message);
      });
  };

  const handleGuestLogin = () => {
    // Simulación de inicio de sesión como invitado
    localStorage.setItem('authToken', 'guest_token'); // Almacenar un token de invitado
    navigate('/dashboard'); // Redirigir al dashboard
  };

  // Estilos de botones para el botón "Iniciar Sesión" (ahora en negro)
  const loginButtonSx = {
    backgroundColor: 'black', // ¡Cambiado a negro directamente!
    color: 'white', 
    '&:hover': {
      backgroundColor: grey[800], // Un gris oscuro para el hover
    },
  };

  // Estilos de botones para el botón "Ingresar como Invitado" (negro outline)
  const guestButtonSx = {
    borderColor: 'black',
    color: 'black',
    '&:hover': {
      backgroundColor: grey[200],
      borderColor: grey[800],
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Añadir la imagen aquí */}
      <img
        src="/logo.png" // Asegúrate de que la ruta sea correcta
        alt="Logo de la aplicación"
        style={{
          maxWidth: '200px', // Ajusta el tamaño según sea necesario
          marginBottom: '20px', // Espacio debajo de la imagen
        }}
      />
      <Card sx={{ maxWidth: 400, margin: 'auto', mt: 0 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Iniciar Sesión
          </Typography>
          <form onSubmit={handleLoginSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Usuario o Correo"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              {error && <Typography color="error">{error}</Typography>}
              <Button
                type="submit"
                variant="contained"
                sx={loginButtonSx} // Aplicamos los estilos del botón de login
                className="mi-boton scale-up-top"
              >
                Iniciar Sesión
              </Button>
              <Typography variant="body2" align="center">
                ¿No tienes una cuenta? <Link component="a" href="/signup" variant="body2" sx={guestButtonSx}>Regístrate</Link>
              </Typography>
            </Stack>
          </form>
          <Button
            variant="outlined"
            onClick={handleGuestLogin}
            sx={{ ...guestButtonSx, marginTop: 2, width: '100%' }} // Aplicamos los estilos del botón de invitado
            className="mi-boton"
          >
            Ingresar como Invitado
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;