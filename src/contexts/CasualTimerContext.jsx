// src/contexts/CasualTimerContext.jsx
import React, { createContext, useState, useEffect, useRef, useContext } from 'react';

const CasualTimerContext = createContext();

export const CasualTimerProvider = ({ children }) => {
  // Estados originales del Timer Casual, ahora elevados aquí
  const [duration, setDuration] = useState(60); // Segundos
  const [repetitions, setRepetitions] = useState(1);
  const [rest, setRest] = useState(0); // Segundos
  const [isCasualRunning, setIsCasualRunning] = useState(false);
  const [casualTimeLeft, setCasualTimeLeft] = useState(60); // Tiempo restante del ciclo actual (ejercicio o descanso)
  const [currentRepetition, setCurrentRepetition] = useState(0); // 0 = no iniciado, 1 = rep1, etc.
  const [isRestPhase, setIsRestPhase] = useState(false); // Para saber si estamos en fase de descanso

  const casualTimerInterval = useRef(null);

  // Efecto para gestionar el intervalo del temporizador casual
  useEffect(() => {
    if (isCasualRunning) {
      casualTimerInterval.current = setInterval(() => {
        setCasualTimeLeft(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            // Tiempo llegó a 0
            clearInterval(casualTimerInterval.current);
            if (isRestPhase) {
              // Si terminamos la fase de descanso, pasamos a la siguiente repetición o terminamos
              setIsRestPhase(false);
              if (currentRepetition < repetitions) {
                setCurrentRepetition(prevRep => prevRep + 1);
                setCasualTimeLeft(duration);
                // No llamamos startCasualTimer aquí, se reiniciará el ciclo con el nuevo estado
              } else {
                setIsCasualRunning(false);
                alert('¡Ejercicio terminado!');
              }
            } else {
              // Si terminamos la fase de ejercicio, pasamos a descanso o terminamos
              if (currentRepetition < repetitions) {
                alert(`¡Fin de la repetición ${currentRepetition}! Preparando descanso...`);
                setIsRestPhase(true);
                setCasualTimeLeft(rest);
                // No llamamos startCasualTimer aquí, se reiniciará el ciclo con el nuevo estado
              } else {
                setIsCasualRunning(false);
                alert('¡Ejercicio terminado!');
              }
            }
            return 0; // El tiempo se ha agotado para la fase actual
          }
        });
      }, 1000);
    } else {
      clearInterval(casualTimerInterval.current);
    }

    // Cleanup function para cuando el proveedor se desmonte
    return () => clearInterval(casualTimerInterval.current);
  }, [isCasualRunning, casualTimeLeft, isRestPhase, duration, repetitions, rest, currentRepetition]); // Dependencias revisadas

  // Funciones para controlar el temporizador casual
  const startCasualTimer = () => {
    if (isCasualRunning) return; // Evitar iniciar si ya está corriendo

    setIsCasualRunning(true);
    // Si es la primera vez que se inicia o se reinició completamente
    if (currentRepetition === 0) {
      setCurrentRepetition(1);
      setCasualTimeLeft(duration); // Empieza con el tiempo de duración del ejercicio
      setIsRestPhase(false); // Asegurarse de que no estamos en fase de descanso al inicio
    } else if (casualTimeLeft === 0) {
      // Si el tiempo llegó a cero pero no se completaron todas las repeticiones/descansos
      if (isRestPhase) {
         setCasualTimeLeft(rest);
      } else {
         setCasualTimeLeft(duration);
      }
    }
    // El useEffect se encargará de iniciar el intervalo debido a isCasualRunning
  };

  const pauseCasualTimer = () => {
    clearInterval(casualTimerInterval.current);
    setIsCasualRunning(false);
  };

  const resetCasualTimer = () => {
    clearInterval(casualTimerInterval.current);
    setIsCasualRunning(false);
    setCasualTimeLeft(duration);
    setCurrentRepetition(0);
    setIsRestPhase(false);
  };

  const handleCasualDurationChange = (newDurationMinutes) => {
    const newDurationSeconds = parseInt(newDurationMinutes, 10) * 60;
    setDuration(newDurationSeconds);
    if (!isCasualRunning && currentRepetition === 0) { // Solo si no está corriendo y no ha iniciado
      setCasualTimeLeft(newDurationSeconds);
    }
  };

  const handleCasualRepetitionsChange = (newRepetitions) => {
    setRepetitions(parseInt(newRepetitions, 10));
    if (!isCasualRunning) {
      setCurrentRepetition(0); // Reinicia la cuenta de repeticiones si no está corriendo
    }
  };

  const handleCasualRestChange = (newRest) => {
    setRest(parseInt(newRest, 10));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const value = {
    duration,
    repetitions,
    rest,
    isCasualRunning,
    casualTimeLeft,
    currentRepetition,
    isRestPhase,
    startCasualTimer,
    pauseCasualTimer,
    resetCasualTimer,
    handleCasualDurationChange,
    handleCasualRepetitionsChange,
    handleCasualRestChange,
    formatTime, // Para que el componente pueda formatear el tiempo
  };

  return (
    <CasualTimerContext.Provider value={value}>
      {children}
    </CasualTimerContext.Provider>
  );
};

export const useCasualTimer = () => {
  const context = useContext(CasualTimerContext);
  if (context === undefined) {
    throw new Error('useCasualTimer must be used within a CasualTimerProvider');
  }
  return context;
};