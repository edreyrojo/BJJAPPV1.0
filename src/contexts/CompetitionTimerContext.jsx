// src/contexts/CompetitionTimerContext.jsx
import React, { createContext, useState, useEffect, useRef, useContext } from 'react';

const CompetitionTimerContext = createContext();

export const CompetitionTimerProvider = ({ children }) => {
  // Estados originales del Timer de Competición, ahora elevados aquí
  const [competitor1Name, setCompetitor1Name] = useState('');
  const [competitor2Name, setCompetitor2Name] = useState('');
  const [matchDuration, setMatchDuration] = useState(300); // 5 minutos en segundos
  const [matchRounds, setMatchRounds] = useState(1);
  const [warmupTime, setWarmupTime] = useState(0); // Segundos
  const [isMatchRunning, setIsMatchRunning] = useState(false);
  const [matchTimeLeft, setMatchTimeLeft] = useState(matchDuration);
  const [score1, setScore1] = useState(0);
  const [advantage1, setAdvantage1] = useState(0);
  const [penalty1, setPenalty1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [advantage2, setAdvantage2] = useState(0);
  const [penalty2, setPenalty2] = useState(0);
  const [currentMatchRound, setCurrentMatchRound] = useState(0); // 0 = no iniciado, 1 = ronda 1, etc.
  const [winner, setWinner] = useState('');
  const [isWarmupPhase, setIsWarmupPhase] = useState(false); // Para saber si estamos en fase de calentamiento

  const matchTimerInterval = useRef(null);

  // Efecto para gestionar el intervalo del temporizador de competición
  useEffect(() => {
    if (isMatchRunning) {
      matchTimerInterval.current = setInterval(() => {
        setMatchTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            // Tiempo llegó a 0
            clearInterval(matchTimerInterval.current);
            if (isWarmupPhase) {
              alert("¡Tiempo de calentamiento terminado! Comienza el combate.");
              setIsWarmupPhase(false);
              setCurrentMatchRound(1);
              setMatchTimeLeft(matchDuration);
              // Llama a startMatchTimer aquí para iniciar el combate
              // Esto podría causar un bucle si no se maneja bien,
              // pero en este caso, la lógica de `startMatchTimer` está diseñada para esto.
              // Alternativamente, podrías tener una función interna para solo iniciar el tick.
              startMatchTimer(); 
            } else {
              alert(`Fin de la ronda ${currentMatchRound}!`);
              if (currentMatchRound < matchRounds) {
                setCurrentMatchRound((prevRound) => prevRound + 1);
                setMatchTimeLeft(matchDuration);
                startMatchTimer(); // Iniciar la siguiente ronda
              } else {
                setIsMatchRunning(false);
                alert("¡Combate terminado!");
                designateWinner(); // Designa al ganador al final del combate
              }
            }
            return 0; // El tiempo se ha agotado para la fase actual
          }
        });
      }, 1000);
    } else {
      clearInterval(matchTimerInterval.current);
    }

    // Cleanup function
    return () => clearInterval(matchTimerInterval.current);
  }, [isMatchRunning, matchTimeLeft, isWarmupPhase, matchDuration, matchRounds, currentMatchRound]); // Dependencias revisadas


  // Funciones para controlar el temporizador de competición
  const startMatchTimer = () => {
    if (isMatchRunning) return;

    setIsMatchRunning(true);
    setWinner(''); // Reiniciar el ganador al iniciar

    if (currentMatchRound === 0) {
      // Si es la primera vez que se inicia
      if (warmupTime > 0 && !isWarmupPhase) { // Solo si hay tiempo de calentamiento y no estamos ya en esa fase
        setIsWarmupPhase(true);
        setMatchTimeLeft(warmupTime);
        alert("¡Calentamiento iniciado!");
      } else {
        setIsWarmupPhase(false);
        setCurrentMatchRound(1);
        setMatchTimeLeft(matchDuration);
        alert("¡Combate iniciado!");
      }
    }
    // El useEffect se encargará de iniciar el intervalo
  };

  const pauseMatchTimer = () => {
    clearInterval(matchTimerInterval.current);
    setIsMatchRunning(false);
  };

  const resetMatchTimer = () => {
    clearInterval(matchTimerInterval.current);
    setIsMatchRunning(false);
    setMatchTimeLeft(matchDuration);
    setScore1(0);
    setAdvantage1(0);
    setPenalty1(0);
    setScore2(0);
    setAdvantage2(0);
    setPenalty2(0);
    setCurrentMatchRound(0);
    setWinner('');
    setIsWarmupPhase(false);
  };

  const handleMatchDurationChange = (newDurationMinutes) => {
    const newDurationSeconds = parseInt(newDurationMinutes, 10) * 60;
    setMatchDuration(newDurationSeconds);
    if (!isMatchRunning && currentMatchRound === 0 && !isWarmupPhase) {
        setMatchTimeLeft(newDurationSeconds); // Solo actualizar si no está corriendo y no ha iniciado
    }
  };

  const handleMatchRoundsChange = (newRounds) => {
    setMatchRounds(parseInt(newRounds, 10));
    if (!isMatchRunning) {
        setCurrentMatchRound(0); // Reiniciar la cuenta de rondas si no está corriendo
    }
  };

  const handleWarmupTimeChange = (newWarmupTime) => {
    setWarmupTime(parseInt(newWarmupTime, 10));
    if (!isMatchRunning && currentMatchRound === 0 && !isWarmupPhase) {
        // Podrías decidir si quieres que el tiempo de calentamiento actualice matchTimeLeft aquí
        // o solo cuando se inicie el timer. Por ahora, lo dejamos solo al iniciar.
    }
  };

  const updateCompetitor1Name = (name) => setCompetitor1Name(name);
  const updateCompetitor2Name = (name) => setCompetitor2Name(name);

  const updateScore = (player, points) => {
    if (player === 1) setScore1(prevScore => prevScore + points);
    else setScore2(prevScore => prevScore + points);
  };

  const updateAdvantage = (player, advantage) => {
    if (player === 1) setAdvantage1(prevAdvantage => Math.max(0, prevAdvantage + advantage));
    else setAdvantage2(prevAdvantage => Math.max(0, prevAdvantage + advantage));
  };

  const updatePenalty = (player, penalty) => {
    if (player === 1) setPenalty1(prevPenalty => Math.max(0, prevPenalty + penalty));
    else setPenalty2(prevPenalty => Math.max(0, prevPenalty + penalty));
  };

  const designateWinner = () => {
    // stopMatchTimer(); // Ya se llama en el useEffect del timer al finalizar
    let currentWinner = '';

    if (score1 > score2) {
      currentWinner = competitor1Name || 'Competidor 1';
    } else if (score2 > score1) {
      currentWinner = competitor2Name || 'Competidor 2';
    } else {
      if (advantage1 > advantage2) {
        currentWinner = competitor1Name || 'Competidor 1';
      } else if (advantage2 > advantage1) {
        currentWinner = competitor2Name || 'Competidor 2';
      } else {
        if (penalty1 < penalty2) {
          currentWinner = competitor1Name || 'Competidor 1';
        } else if (penalty2 < penalty1) {
          currentWinner = competitor2Name || 'Competidor 2';
        } else {
          currentWinner = 'Empate';
        }
      }
    }
    setWinner(currentWinner);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const value = {
    competitor1Name,
    setCompetitor1Name: updateCompetitor1Name, // Pasa la función de actualización de nombre
    competitor2Name,
    setCompetitor2Name: updateCompetitor2Name, // Pasa la función de actualización de nombre
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
    pauseMatchTimer,
    resetMatchTimer,
    handleMatchDurationChange,
    handleMatchRoundsChange,
    handleWarmupTimeChange,
    updateScore,
    updateAdvantage,
    updatePenalty,
    designateWinner,
    formatTime, // Para que el componente pueda formatear el tiempo
  };

  return (
    <CompetitionTimerContext.Provider value={value}>
      {children}
    </CompetitionTimerContext.Provider>
  );
};

export const useCompetitionTimer = () => {
  const context = useContext(CompetitionTimerContext);
  if (context === undefined) {
    throw new Error('useCompetitionTimer must be used within a CompetitionTimerProvider');
  }
  return context;
};