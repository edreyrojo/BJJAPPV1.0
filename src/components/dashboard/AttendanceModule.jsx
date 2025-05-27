import React, { useState } from 'react';
import { Typography, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Stack, Avatar, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors'; // Importa grey para los colores hover

function AttendanceModule() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [newStudent, setNewStudent] = useState({ name: '', gender: '', age: '', experience: '', trainingDays: '', profilePic: '' });
  const [studentsInGroup, setStudentsInGroup] = useState([]);
  const [attendance, setAttendance] = useState({}); // Objeto para almacenar la asistencia {studentId: isPresent}
  const [newQuickStudentName, setNewQuickStudentName] = useState('');

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      setGroups([...groups, { id: Date.now(), name: newGroupName, students: [] }]);
      setNewGroupName('');
    }
  };

  const handleGroupNameChange = (event) => {
    setNewGroupName(event.target.value);
  };

  const handleSelectGroup = (event) => {
    const groupId = event.target.value;
    setSelectedGroup(groupId);
    const selected = groups.find(group => group.id === groupId);
    setStudentsInGroup(selected ? selected.students : []);
    // Resetear la asistencia al cambiar de grupo
    setAttendance({});
  };

  const handleNewStudentChange = (event) => {
    const { name, value } = event.target;
    setNewStudent(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddStudent = () => {
    if (selectedGroup) {
      const updatedGroups = groups.map(group => {
        if (group.id === selectedGroup) {
          return { ...group, students: [...group.students, { id: Date.now(), ...newStudent }] };
        }
        return group;
      });
      setGroups(updatedGroups);
      const currentGroup = updatedGroups.find(group => group.id === selectedGroup);
      setStudentsInGroup(currentGroup.students);
      setNewStudent({ name: '', gender: '', age: '', experience: '', trainingDays: '', profilePic: '' });
    }
  };

  const handleAttendanceChange = (studentId) => (event) => {
    setAttendance(prevAttendance => ({
      ...prevAttendance,
      [studentId]: event.target.checked,
    }));
  };

  const handleSaveAttendance = () => {
    console.log('Asistencia guardada:', attendance);
    // Aquí iría la lógica para guardar la asistencia en tu base de datos (simulada)
    alert('Asistencia guardada (simulado)!');
  };

  const handleQuickRegister = () => {
    if (selectedGroup && newQuickStudentName.trim()) {
      const newStudentQuick = { id: Date.now(), name: newQuickStudentName, isQuick: true };
      const updatedGroups = groups.map(group => {
        if (group.id === selectedGroup) {
          return { ...group, students: [...group.students, newStudentQuick] };
        }
        return group;
      });
      setGroups(updatedGroups);
      const currentGroup = updatedGroups.find(group => group.id === selectedGroup);
      setStudentsInGroup(currentGroup.students);
      // Marcar como presente automáticamente al registrar rápido
      setAttendance(prevAttendance => ({ ...prevAttendance, [newStudentQuick.id]: true }));
      setNewQuickStudentName('');
    }
  };

  const handleQuickStudentNameChange = (event) => {
    setNewQuickStudentName(event.target.value);
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Módulo de Asistencia
      </Typography>

      {/* Crear Nuevo Grupo */}
      <Box mb={3}>
        <TextField label="Nombre del Nuevo Grupo" value={newGroupName} onChange={handleGroupNameChange} size="small" />
        <Button
          variant="contained"
          onClick={handleCreateGroup}
          sx={{
            ml: 2,
            backgroundColor: 'black', // Fondo negro
            color: 'white',         // Texto blanco
            '&:hover': {
              backgroundColor: grey[800], // Un gris oscuro al pasar el ratón
            },
          }}
        >
          Crear Grupo
        </Button>
      </Box>

      {/* Seleccionar Grupo y Listar Alumnos para Asistencia */}
      <FormControl fullWidth size="small" sx={{ mb: 2 }}> {/* Usar sx para mb en FormControl */}
        <InputLabel id="select-group-label">Seleccionar Grupo para Asistencia</InputLabel>
        <Select labelId="select-group-label" id="select-group" value={selectedGroup} label="Seleccionar Grupo para Asistencia" onChange={handleSelectGroup}>
          <MenuItem value=""><em>Ninguno</em></MenuItem>
          {groups.map(group => (
            <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedGroup && (
        <Box mb={3}>
          <Typography variant="subtitle1">Lista de Alumnos y Asistencia:</Typography>
          {studentsInGroup.length > 0 ? (
            <Stack spacing={2}>
              {studentsInGroup.map(student => (
                <Box key={student.id} display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    {student.profilePic && <Avatar src={student.profilePic} sx={{ mr: 1 }} />}
                    <Typography>{student.name} {student.isQuick && '(Registro Rápido)'}</Typography>
                  </Box>
                  <FormControlLabel
                    control={<Checkbox checked={attendance[student.id] || false} onChange={handleAttendanceChange(student.id)} />}
                    label="Presente"
                  />
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography>No hay alumnos registrados en este grupo.</Typography>
          )}
          {studentsInGroup.length > 0 && (
            <Button
              variant="contained"
              onClick={handleSaveAttendance}
              sx={{
                mt: 2,
                backgroundColor: 'black', // Fondo negro
                color: 'white',         // Texto blanco
                '&:hover': {
                  backgroundColor: grey[800], // Un gris oscuro al pasar el ratón
                },
              }}
            >
              Guardar Asistencia
            </Button>
          )}
        </Box>
      )}

      {/* Registro Rápido de Nuevo Alumno para Asistencia */}
      {selectedGroup && (
        <Box mb={3} border="1px solid #ccc" p={2}>
          <Typography variant="subtitle1" gutterBottom>
            Registro Rápido para Asistencia
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Nombre del Alumno"
              value={newQuickStudentName}
              onChange={handleQuickStudentNameChange}
              size="small"
            />
            <Button
              variant="contained"
              onClick={handleQuickRegister}
              sx={{
                backgroundColor: 'black', // Fondo negro
                color: 'white',         // Texto blanco
                '&:hover': {
                  backgroundColor: grey[800], // Un gris oscuro al pasar el ratón
                },
              }}
            >
              Registrar y Presente
            </Button>
          </Stack>
        </Box>
      )}

      {/* Formulario para Registrar Nuevo Alumno (con todos los detalles) */}
      {selectedGroup && (
        <Box mb={3} border="1px solid #ccc" p={2}>
          <Typography variant="subtitle1" gutterBottom>
            Registrar Nuevo Alumno (Detalles)
          </Typography>
          <Stack spacing={2}>
            <TextField label="Nombre del Alumno" name="name" value={newStudent.name} onChange={handleNewStudentChange} size="small" />
            <FormControl size="small">
              <InputLabel id="gender-label">Género</InputLabel>
              <Select labelId="gender-label" id="gender" name="gender" value={newStudent.gender} onChange={handleNewStudentChange} label="Género">
                <MenuItem value=""><em>Prefiero no decir</em></MenuItem>
                <MenuItem value="male">Masculino</MenuItem>
                <MenuItem value="female">Femenino</MenuItem>
                <MenuItem value="other">Otro</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Edad" name="age" type="number" value={newStudent.age} onChange={handleNewStudentChange} size="small" />
            <TextField label="Experiencia (ej: Principiante, 1 año)" name="experience" value={newStudent.experience} onChange={handleNewStudentChange} size="small" />
            <TextField label="Días de Entrenamiento (ej: Lunes, Miércoles)" name="trainingDays" value={newStudent.trainingDays} onChange={handleNewStudentChange} size="small" />
            <TextField label="URL de Foto de Perfil (opcional)" name="profilePic" value={newStudent.profilePic} onChange={handleNewStudentChange} size="small" />
            <Button
              variant="contained"
              onClick={handleAddStudent}
              sx={{
                backgroundColor: 'black', // Fondo negro
                color: 'white',         // Texto blanco
                '&:hover': {
                  backgroundColor: grey[800], // Un gris oscuro al pasar el ratón
                },
              }}
            >
              Agregar Alumno
            </Button>
          </Stack>
        </Box>
      )}

      <Button
        variant="outlined"
        onClick={handleBackToDashboard}
        sx={{
          mt: 2,
          borderColor: 'black', // Borde negro para el botón outlined
          color: 'black',       // Texto negro para el botón outlined
          '&:hover': {
            backgroundColor: grey[200], // Un gris claro al pasar el ratón para el outlined
            borderColor: grey[800],
          },
        }}
      >
        Regresar al Dashboard
      </Button>
    </Box>
  );
}

export default AttendanceModule;