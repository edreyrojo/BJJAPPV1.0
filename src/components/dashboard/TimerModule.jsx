// src/components/dashboard/TimerModule.jsx
import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, FormControl, InputLabel, Select, MenuItem, TextField, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

// Importa tus hooks de contexto con la ruta corregida
import { useCasualTimer } from '../../contexts/CasualTimerContext';
import { useCompetitionTimer } from '../../contexts/CompetitionTimerContext';

function TimerModule() {
  const navigate = useNavigate();
  const theme = useTheme();

  // Estado local para el modo (Casual/Competición)
  const [isCasualMode, setIsCasualMode] = useState(true);

  // Consumir el estado y las funciones del CasualTimerContext
  const {
    duration,
    repetitions,
    rest,
    isCasualRunning,
    casualTimeLeft,
    currentRepetition,
    isRestPhase,
    startCasualTimer,
    pauseCasualTimer: stopCasualTimer,
    resetCasualTimer,
    handleCasualDurationChange,
    handleCasualRepetitionsChange,
    handleCasualRestChange,
    formatTime: formatCasualTime,
  } = useCasualTimer();

  // Consumir el estado y las funciones del CompetitionTimerContext
  const {
    competitor1Name,
    setCompetitor1Name,
    competitor2Name,
    setCompetitor2Name,
    matchDuration,
    matchRounds,
    warmupTime,
    isMatchRunning,
    matchTimeLeft,
    score1,
    advantage1,
    penalty1,
    score2,
    advantage2,
    penalty2,
    currentMatchRound,
    winner,
    isWarmupPhase,
    startMatchTimer,
    pauseMatchTimer: stopMatchTimer,
    resetMatchTimer,
    handleMatchDurationChange,
    handleMatchRoundsChange,
    handleWarmupTimeChange,
    updateScore,
    updateAdvantage,
    updatePenalty,
    designateWinner,
    formatTime: formatMatchTime,
  } = useCompetitionTimer();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleModeChange = (mode) => {
    setIsCasualMode(mode === 'casual');
  };

  // Estilos de botones comunes (negros)
  const commonButtonSx = {
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: grey[800],
    },
  };

  // Estilos de botones Outline (negros)
  const outlinedButtonSx = {
    borderColor: 'black',
    color: 'black',
    '&:hover': {
      backgroundColor: grey[200],
      borderColor: grey[800],
    },
  };

  return (
    <Box mt={3} textAlign="center">
      <Typography variant="h6" gutterBottom>
        Módulo de Timer
      </Typography>

      <Box mb={2}>
        <Button
          onClick={() => handleModeChange('casual')}
          variant={isCasualMode ? 'contained' : 'outlined'}
          size="small"
          sx={isCasualMode ? { ...commonButtonSx, mr: 1 } : { ...outlinedButtonSx, mr: 1 }}
        >
          Casual
        </Button>
        <Button
          onClick={() => handleModeChange('competition')}
          variant={!isCasualMode ? 'contained' : 'outlined'}
          size="small"
          sx={!isCasualMode ? commonButtonSx : outlinedButtonSx}
        >
          Competición
        </Button>
      </Box>

      {/* --- Contenido del Timer Casual --- */}
      {isCasualMode && (
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="duration-label">Duración (minutos)</InputLabel>
            <Select
              labelId="duration-label"
              id="duration"
              value={duration / 60}
              onChange={(e) => handleCasualDurationChange(e.target.value)}
              label="Duración (minutos)"
            >
              {[1, 2, 3, 5, 10].map(min => (
                <MenuItem key={min} value={min}>{min}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Repeticiones/Rondas"
            type="number"
            value={repetitions}
            onChange={(e) => handleCasualRepetitionsChange(e.target.value)}
            size="small"
            sx={{ m: 1, width: 120 }}
          />

          <TextField
            label="Descanso (segundos)"
            type="number"
            value={rest}
            onChange={(e) => handleCasualRestChange(e.target.value)}
            size="small"
            sx={{ m: 1, width: 120 }}
          />

          <Typography variant="h4" mt={3}>
            {isRestPhase ? 'Descanso: ' : ''}
            {formatCasualTime(casualTimeLeft)}
          </Typography>
          <Typography variant="subtitle1">Repetición: {currentRepetition} / {repetitions}</Typography>

          <Box mt={2}>
            {!isCasualRunning ? (
              <Button variant="contained" sx={commonButtonSx} onClick={startCasualTimer}>
                Iniciar
              </Button>
            ) : (
              <Button variant="contained" sx={commonButtonSx} onClick={stopCasualTimer}>
                Detener
              </Button>
            )}
            <Button variant="outlined" sx={{ ...outlinedButtonSx, ml: 2 }} onClick={resetCasualTimer}>
              Reiniciar
            </Button>
          </Box>
        </Box>
      )}

      {/* --- Contenido del Timer de Competición --- */}
      {!isCasualMode && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Timer de Competición (IBJJF)
          </Typography>
          {/* Grid container: No necesita 'item' */}
          <Grid container spacing={2} justifyContent="center" alignItems="center" mb={2}>
            {/* Grid items: Eliminado 'item' prop */}
            <Grid> {/* Antes: <Grid item> */}
              <TextField label="Competidor 1" value={competitor1Name} onChange={(e) => setCompetitor1Name(e.target.value)} size="small" />
            </Grid>
            <Grid> {/* Antes: <Grid item> */}
              <TextField label="Competidor 2" value={competitor2Name} onChange={(e) => setCompetitor2Name(e.target.value)} size="small" />
            </Grid>
            <Grid> {/* Antes: <Grid item> */}
              <FormControl size="small">
                <InputLabel id="duration-label">Duración (min)</InputLabel>
                <Select
                  labelId="duration-label"
                  value={matchDuration / 60}
                  onChange={(e) => handleMatchDurationChange(e.target.value)}
                  label="Duración (min)"
                >
                  {[4, 5, 6, 7, 8, 9, 10].map(min => (
                    <MenuItem key={min} value={min}>{min}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid> {/* Antes: <Grid item> */}
              <TextField type="number" label="Rondas" value={matchRounds} onChange={(e) => handleMatchRoundsChange(e.target.value)} size="small" />
            </Grid>
            <Grid> {/* Antes: <Grid item> */}
              <TextField type="number" label="Espera (seg)" value={warmupTime} onChange={(e) => handleWarmupTimeChange(e.target.value)} size="small" />
            </Grid>
          </Grid>

          <Typography variant="h4" mt={2}>
            {isWarmupPhase ? `Calentamiento: ${formatMatchTime(matchTimeLeft)}` : `Combate: ${formatMatchTime(matchTimeLeft)}`}
          </Typography>
          <Typography variant="subtitle1">Ronda: {currentMatchRound} / {matchRounds}</Typography>

          {winner && (
              <Typography variant="h3" color="primary" mt={2} mb={2}>
                ¡Ganador: {winner}!
              </Typography>
          )}

          {/* Grid container para los cuadros de competidores */}
          <Grid container spacing={2} mt={2} justifyContent="space-around">
            {/* Cuadro para Competidor 1: 'item' eliminado, 'xs' y 'md' se aplican directamente */}
            <Grid xs={12} md={5}> {/* Antes: <Grid item xs={12} md={5}> */}
              <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box textAlign="center" mb={2}>
                  <Typography variant="h6" color="text.primary">{competitor1Name || 'Competidor 1'}</Typography>
                  <Typography color="text.primary">Puntos: {score1}</Typography>
                  <Typography color="text.primary">Ventajas: {advantage1}</Typography>
                  <Typography color="text.primary">Penalizaciones: {penalty1}</Typography>
                </Box>
                <Box mt={1} textAlign="center">
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5 }} onClick={() => updateScore(1, 2)}>Takedown (+2)</Button>
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5 }} onClick={() => updateScore(1, 2)}>Sweep (+2)</Button>
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5 }} onClick={() => updateScore(1, 3)}>Pass (+3)</Button>
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5 }} onClick={() => updateScore(1, 4)}>Montada/Espalda (+4)</Button>
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5 }} onClick={() => updateAdvantage(1, 1)}>Advantage (+1)</Button>
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5 }} onClick={() => updatePenalty(1, 1)}>Penalización (+1)</Button>
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5, backgroundColor: grey[500], '&:hover': { backgroundColor: grey[700] } }} onClick={() => updatePenalty(1, -1)}>Quitar Penalización (-1)</Button>
                </Box>
              </Paper>
            </Grid>

            {/* Cuadro para Competidor 2: 'item' eliminado, 'xs' y 'md' se aplican directamente */}
            <Grid xs={12} md={5}> {/* Antes: <Grid item xs={12} md={5}> */}
              <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box textAlign="center" mb={2}>
                  <Typography variant="h6" color="text.primary">{competitor2Name || 'Competidor 2'}</Typography>
                  <Typography color="text.primary">Puntos: {score2}</Typography>
                  <Typography color="text.primary">Ventajas: {advantage2}</Typography>
                  <Typography color="text.primary">Penalizaciones: {penalty2}</Typography>
                </Box>
                <Box mt={1} textAlign="center">
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5 }} onClick={() => updateScore(2, 2)}>Takedown (+2)</Button>
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5 }} onClick={() => updateScore(2, 2)}>Sweep (+2)</Button>
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5 }} onClick={() => updateScore(2, 3)}>Pass (+3)</Button>
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5 }} onClick={() => updateScore(2, 4)}>Montada/Espalda (+4)</Button>
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5 }} onClick={() => updateAdvantage(2, 1)}>Advantage (+1)</Button>
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5 }} onClick={() => updatePenalty(2, 1)}>Penalización (+1)</Button>
                  <Button variant="contained" sx={{ ...commonButtonSx, m: 0.5, backgroundColor: grey[500], '&:hover': { backgroundColor: grey[700] } }} onClick={() => updatePenalty(2, -1)}>Quitar Penalización (-1)</Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Box mt={2} >
            {!isMatchRunning ? (
              <Button variant="contained" sx={commonButtonSx} onClick={startMatchTimer} >
                Iniciar Combate
              </Button>
            ) : (
              <Button variant="contained" sx={commonButtonSx} onClick={stopMatchTimer}>
                Pausar Combate
              </Button>
            )}
            <Button variant="outlined" sx={{ ...outlinedButtonSx, ml: 2 }} onClick={resetMatchTimer}>
              Reiniciar Combate
            </Button>
            <Button
              onClick={designateWinner}
              variant="contained"
              sx={{
                ml: 2,
                backgroundColor: theme.palette.error.main,
                '&:hover': { backgroundColor: theme.palette.error.dark }
              }}
            >
              Finalizar Combate
            </Button>
            <Button variant="outlined" sx={{ ...outlinedButtonSx, ml: 2 }} onClick={() => alert('Resultado guardado (simulado)')}>
              Guardar Resultado
            </Button>
          </Box>
        </Box>
      )}

      <Button
        variant="outlined"
        onClick={handleBackToDashboard}
        sx={{
          mt: 3,
          borderColor: 'black',
          color: 'black',
          '&:hover': {
            backgroundColor: grey[200],
            borderColor: grey[800],
          },
        }}
      >
        Regresar al Dashboard
      </Button>
    </Box>
  );
}

export default TimerModule;