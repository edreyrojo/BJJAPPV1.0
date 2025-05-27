import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Grid // Se usará para la distribución
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { grey } from '@mui/material/colors';

function ClassNotesModule() {
  const navigate = useNavigate();

  const [classDetails, setClassDetails] = useState({
    date: new Date(),
    instructor: '',
    level: '',
    duration: '',
    type: '',
    warmUpType: '',
    warmUpExercises: '',
    techniqueName: '',
    techniqueBasePosition: '',
    techniqueObjective: '',
    techniqueDetails: '',
    commonErrors: '',
    drills: '',
    drillsRepsTime: '',
    sparringType: '',
    sparringObjective: '',
    sparringRoundTime: '',
    closureComments: '',
    groupObservations: '',
    personalNote: '',
    isTemplate: false,
    featuredAttendees: '',
    nextClassRecommendations: '',
    videoLink: '',
  });

  const [savedNotes, setSavedNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');

  // Cargar plantillas y notas guardadas al inicio
  useEffect(() => {
    const storedTemplates = localStorage.getItem('classNoteTemplates');
    if (storedTemplates) {
      setTemplates(JSON.parse(storedTemplates));
    }
    const storedNotes = localStorage.getItem('classNotes');
    if (storedNotes) {
      setSavedNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Guardar plantillas y notas cuando cambian
  useEffect(() => {
    localStorage.setItem('classNoteTemplates', JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem('classNotes', JSON.stringify(savedNotes));
  }, [savedNotes]);


  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setClassDetails({
      ...classDetails,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDateChange = (date) => {
    setClassDetails({
      ...classDetails,
      date: date,
    });
  };

  const handleSaveNotes = () => {
    const newNote = { id: Date.now(), ...classDetails };
    setSavedNotes([...savedNotes, newNote]);
    if (classDetails.isTemplate) {
      const newTemplate = { id: Date.now(), ...classDetails, isTemplate: false };
      setTemplates([...templates, newTemplate]);
    }
    // Reiniciar el formulario
    setClassDetails({
      date: new Date(),
      instructor: '',
      level: '',
      duration: '',
      type: '',
      warmUpType: '',
      warmUpExercises: '',
      techniqueName: '',
      techniqueBasePosition: '',
      techniqueObjective: '',
      techniqueDetails: '',
      commonErrors: '',
      drills: '',
      drillsRepsTime: '',
      sparringType: '',
      sparringObjective: '',
      sparringRoundTime: '',
      closureComments: '',
      groupObservations: '',
      personalNote: '',
      isTemplate: false,
      featuredAttendees: '',
      nextClassRecommendations: '',
      videoLink: '',
    });
    alert(`Nota guardada exitosamente! ${classDetails.isTemplate ? 'Guardada también como plantilla.' : ''}`);
  };

  const handleNoteClick = (noteId) => {
    const note = savedNotes.find((n) => n.id === noteId);
    setSelectedNote(note);
  };

  const handleLoadTemplate = (templateId) => {
    const templateToLoad = templates.find(template => template.id === templateId);
    if (templateToLoad) {
      setClassDetails({
        ...templateToLoad,
        id: undefined,
        date: new Date(),
        isTemplate: false
      });
      alert('Plantilla cargada. Modifica y guarda como una nueva nota.');
    }
    setSelectedTemplateId('');
  };

  const handleDeleteTemplate = (templateId) => {
    const updatedTemplates = templates.filter(template => template.id !== templateId);
    setTemplates(updatedTemplates);
    alert('Plantilla eliminada.');
  };

  const handleTemplateSelectionChange = (event) => {
    setSelectedTemplateId(event.target.value);
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box mt={3} maxWidth="lg" mx="auto" p={2}>
        <Typography variant="h5" gutterBottom align="center">
          Módulo de Notas de Clase
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Sección de Carga de Plantillas */}
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Cargar Plantilla
          </Typography>
          {templates.length > 0 ? (
            <Grid container spacing={2} alignItems="center">
              {/* CAMBIO AQUÍ: `size` prop */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="template-select-label">Seleccionar Plantilla</InputLabel>
                  <Select
                    labelId="template-select-label"
                    id="template-select"
                    value={selectedTemplateId}
                    label="Seleccionar Plantilla"
                    onChange={handleTemplateSelectionChange}
                  >
                    <MenuItem value=""><em>Ninguna</em></MenuItem>
                    {templates.map(template => (
                      <MenuItem key={template.id} value={template.id}>
                        {template.techniqueName || `Plantilla del ${new Date(template.date).toLocaleDateString()}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* CAMBIO AQUÍ: `size` prop */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    onClick={() => handleLoadTemplate(selectedTemplateId)}
                    disabled={!selectedTemplateId}
                    fullWidth
                    sx={commonButtonSx}
                  >
                    Cargar
                  </Button>
                  {selectedTemplateId && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteTemplate(selectedTemplateId)}
                      fullWidth
                      sx={outlinedButtonSx}
                    >
                      Eliminar
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="body2" color="text.secondary">No hay plantillas guardadas aún. Crea una nota y márcala como plantilla para guardarla.</Typography>
          )}
        </Paper>

        {/* Formulario para crear notas */}
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Crear Nueva Nota
          </Typography>
          <Grid container spacing={3}>
            {/* Detalles Generales de la Clase */}
            {/* CAMBIO AQUÍ: `size` prop */}
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Stack spacing={2}>
                <DatePicker
                  label="Fecha"
                  value={classDetails.date}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: { size: 'small', fullWidth: true }
                  }}
                />
                <TextField label="Instructor a cargo" name="instructor" value={classDetails.instructor} onChange={handleChange} size="small" fullWidth />
                <FormControl size="small" fullWidth>
                  <InputLabel id="level-label">Nivel</InputLabel>
                  <Select labelId="level-label" id="level" name="level" value={classDetails.level} onChange={handleChange} label="Nivel">
                    <MenuItem value="Infantil">Infantil</MenuItem>
                    <MenuItem value="Principiante">Principiante</MenuItem>
                    <MenuItem value="Intermedio">Intermedio</MenuItem>
                    <MenuItem value="Avanzado">Avanzado</MenuItem>
                    <MenuItem value="Competidor">Competidor</MenuItem>
                  </Select>
                </FormControl>
                <TextField label="Duración de la clase (minutos)" name="duration" type="number" value={classDetails.duration} onChange={handleChange} size="small" fullWidth />
                <FormControl size="small" fullWidth>
                  <InputLabel id="type-label">Tipo de clase</InputLabel>
                  <Select labelId="type-label" id="type" name="type" value={classDetails.type} onChange={handleChange} label="Tipo de clase">
                    <MenuItem value="Técnica">Técnica</MenuItem>
                    <MenuItem value="Drills">Drills</MenuItem>
                    <MenuItem value="Sparring">Sparring</MenuItem>
                    <MenuItem value="Situacional">Situacional</MenuItem>
                    <MenuItem value="Defensa Personal">Defensa Personal</MenuItem>
                    <MenuItem value="Preparación Física">Preparación Física</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>

            {/* Sección de Calentamiento */}
            {/* CAMBIO AQUÍ: `size` prop */}
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>A. Calentamiento</Typography>
                <Stack spacing={2}>
                  <TextField label="Tipo de calentamiento" name="warmUpType" value={classDetails.warmUpType} onChange={handleChange} size="small" fullWidth />
                  <TextField label="Ejercicios realizados (separados por coma)" name="warmUpExercises" value={classDetails.warmUpExercises} onChange={handleChange} size="small" multiline rows={3} fullWidth />
                </Stack>
              </Paper>
            </Grid>

            {/* Sección de Técnica del día */}
            {/* CAMBIO AQUÍ: `size` prop */}
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>B. Técnica del día</Typography>
                <Stack spacing={2}>
                  <TextField label="Nombre de la técnica" name="techniqueName" value={classDetails.techniqueName} onChange={handleChange} size="small" fullWidth />
                  <FormControl size="small" fullWidth>
                    <InputLabel id="base-position-label">Posición base</InputLabel>
                    <Select labelId="base-position-label" id="techniqueBasePosition" name="techniqueBasePosition" value={classDetails.techniqueBasePosition} onChange={handleChange} label="Posición base">
                      <MenuItem value="Guardia">Guardia</MenuItem>
                      <MenuItem value="Pase">Pase</MenuItem>
                      <MenuItem value="Montada">Montada</MenuItem>
                      <MenuItem value="Espalda">Espalda</MenuItem>
                      <MenuItem value="De Pie">De Pie</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="objective-label">Objetivo</InputLabel>
                    <Select labelId="objective-label" id="techniqueObjective" name="techniqueObjective" value={classDetails.techniqueObjective} onChange={handleChange} label="Objetivo">
                      <MenuItem value="Control">Control</MenuItem>
                      <MenuItem value="Sumisión">Sumisión</MenuItem>
                      <MenuItem value="Transición">Transición</MenuItem>
                      <MenuItem value="Escape">Escape</MenuItem>
                      <MenuItem value="Puntuar">Puntuar</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField label="Detalles técnicos clave" name="techniqueDetails" value={classDetails.techniqueDetails} onChange={handleChange} size="small" multiline rows={4} fullWidth />
                  <TextField label="Errores comunes a evitar (opcional)" name="commonErrors" value={classDetails.commonErrors} onChange={handleChange} size="small" multiline rows={3} fullWidth />
                </Stack>
              </Paper>
            </Grid>

            {/* Sección de Drills y Sparring */}
            {/* CAMBIO AQUÍ: `size` prop */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={1} sx={{ p: 2, mb: 2, height: 'auto' }}>
                <Typography variant="h6" gutterBottom>C. Drills o repeticiones</Typography>
                <Stack spacing={2}>
                  <TextField label="Drills asociados a la técnica del día" name="drills" value={classDetails.drills} onChange={handleChange} size="small" multiline rows={3} fullWidth />
                  <TextField label="Repeticiones o tiempo sugerido" name="drillsRepsTime" value={classDetails.drillsRepsTime} onChange={handleChange} size="small" fullWidth />
                </Stack>
              </Paper>

              <Paper elevation={1} sx={{ p: 2, height: 'auto' }}>
                <Typography variant="h6" gutterBottom>D. Situacionales / Sparring</Typography>
                <Stack spacing={2}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="sparring-type-label">Tipo de sparring</InputLabel>
                    <Select labelId="sparring-type-label" id="sparringType" name="sparringType" value={classDetails.sparringType} onChange={handleChange} label="Tipo de sparring">
                      <MenuItem value="Situacional">Situacional</MenuItem>
                      <MenuItem value="Libre">Libre</MenuItem>
                      <MenuItem value="Posicional">Posicional</MenuItem>
                      <MenuItem value="Desde Posición Específica">Desde Posición Específica</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField label="Objetivo del sparring" name="sparringObjective" value={classDetails.sparringObjective} onChange={handleChange} size="small" fullWidth />
                  <TextField label="Tiempo por ronda (minutos)" name="sparringRoundTime" type="number" value={classDetails.sparringRoundTime} onChange={handleChange} size="small" fullWidth />
                </Stack>
              </Paper>
            </Grid>

            {/* Sección de Cierre y Extras */}
            {/* CAMBIO AQUÍ: `size` prop */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={1} sx={{ p: 2, mb: 2, height: 'auto' }}>
                <Typography variant="h6" gutterBottom>E. Cierre / Reflexión (opcional)</Typography>
                <Stack spacing={2}>
                  <TextField label="Comentarios del instructor" name="closureComments" value={classDetails.closureComments} onChange={handleChange} size="small" multiline rows={3} fullWidth />
                  <TextField label="Observaciones generales del grupo" name="groupObservations" value={classDetails.groupObservations} onChange={handleChange} size="small" multiline rows={3} fullWidth />
                  <TextField label="Nota personal para próxima clase" name="personalNote" value={classDetails.personalNote} onChange={handleChange} size="small" multiline rows={3} fullWidth />
                </Stack>
              </Paper>

              <Paper elevation={1} sx={{ p: 2, height: 'auto' }}>
                <Typography variant="h6" gutterBottom>Extras (Opcionales)</Typography>
                <Stack spacing={2}>
                  <TextField label="Asistentes destacados / Progreso individual notado" name="featuredAttendees" value={classDetails.featuredAttendees} onChange={handleChange} size="small" multiline rows={2} fullWidth />
                  <TextField label="Recomendaciones para siguientes clases" name="nextClassRecommendations" value={classDetails.nextClassRecommendations} onChange={handleChange} size="small" multiline rows={2} fullWidth />
                  <TextField label="Link a video o referencia técnica" name="videoLink" value={classDetails.videoLink} onChange={handleChange} size="small" fullWidth />
                  <FormControlLabel
                    control={<Checkbox checked={classDetails.isTemplate} onChange={handleChange} name="isTemplate" />}
                    label="¿Agregar esta clase como plantilla reutilizable?"
                  />
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          {/* Botón para guardar la nota */}
          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              onClick={handleSaveNotes}
              sx={commonButtonSx}
            >
              Guardar Nota
            </Button>
          </Box>
        </Paper>

        <Divider sx={{ my: 3 }} />

        {/* Sección de Notas Guardadas */}
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Notas Guardadas
          </Typography>
          {savedNotes.length > 0 ? (
            <List>
              {savedNotes.map(note => (
                <div key={note.id}>
                  <ListItem button onClick={() => handleNoteClick(note.id)}>
                    <ListItemText
                      primary={`Clase del ${new Date(note.date).toLocaleDateString()} - ${note.techniqueName || 'Sin Técnica'}`}
                      secondary={`Instructor: ${note.instructor}, Nivel: ${note.level}, Tipo: ${note.type}`}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">No hay notas guardadas aún. ¡Empieza a registrar tus clases!</Typography>
          )}
        </Paper>

        {/* Sección de Detalles de la Nota Seleccionada */}
        {selectedNote && (
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Detalles de la Nota (Clase del {new Date(selectedNote.date).toLocaleDateString()})
            </Typography>
            <Grid container spacing={2}>
              {/* CAMBIO AQUÍ: `size` prop */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="subtitle2">**Información General**</Typography>
                <Typography variant="body2">**Instructor:** {selectedNote.instructor || 'N/A'}</Typography>
                <Typography variant="body2">**Nivel:** {selectedNote.level || 'N/A'}</Typography>
                <Typography variant="body2">**Duración:** {selectedNote.duration ? `${selectedNote.duration} minutos` : 'N/A'}</Typography>
                <Typography variant="body2">**Tipo de Clase:** {selectedNote.type || 'N/A'}</Typography>
              </Grid>

              {/* CAMBIO AQUÍ: `size` prop */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="subtitle2">**A. Calentamiento**</Typography>
                <Typography variant="body2">**Tipo:** {selectedNote.warmUpType || 'N/A'}</Typography>
                <Typography variant="body2">**Ejercicios:** {selectedNote.warmUpExercises || 'N/A'}</Typography>

                <Typography variant="subtitle2" mt={2}>**C. Drills o repeticiones**</Typography>
                <Typography variant="body2">**Drills:** {selectedNote.drills || 'N/A'}</Typography>
                <Typography variant="body2">**Repeticiones/Tiempo:** {selectedNote.drillsRepsTime || 'N/A'}</Typography>
              </Grid>

              {/* CAMBIO AQUÍ: `size` prop */}
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <Typography variant="subtitle2">**B. Técnica del día**</Typography>
                <Typography variant="body2">**Nombre:** {selectedNote.techniqueName || 'N/A'}</Typography>
                <Typography variant="body2">**Posición Base:** {selectedNote.techniqueBasePosition || 'N/A'}</Typography>
                <Typography variant="body2">**Objetivo:** {selectedNote.techniqueObjective || 'N/A'}</Typography>
                <Typography variant="body2">**Detalles Clave:** {selectedNote.techniqueDetails || 'N/A'}</Typography>
                <Typography variant="body2">**Errores Comunes:** {selectedNote.commonErrors || 'N/A'}</Typography>
              </Grid>

              {/* CAMBIO AQUÍ: `size` prop */}
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <Typography variant="subtitle2" mt={2}>**D. Situacionales / Sparring**</Typography>
                <Typography variant="body2">**Tipo:** {selectedNote.sparringType || 'N/A'}</Typography>
                <Typography variant="body2">**Objetivo:** {selectedNote.sparringObjective || 'N/A'}</Typography>
                <Typography variant="body2">**Tiempo por ronda:** {selectedNote.sparringRoundTime ? `${selectedNote.sparringRoundTime} minutos` : 'N/A'}</Typography>
              </Grid>

              {/* CAMBIO AQUÍ: `size` prop */}
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <Typography variant="subtitle2" mt={2}>**E. Cierre / Reflexión**</Typography>
                <Typography variant="body2">**Comentarios:** {selectedNote.closureComments || 'N/A'}</Typography>
                <Typography variant="body2">**Observaciones del grupo:** {selectedNote.groupObservations || 'N/A'}</Typography>
                <Typography variant="body2">**Nota personal:** {selectedNote.personalNote || 'N/A'}</Typography>
              </Grid>

              {/* Extras en una nueva fila si existen */}
              {(selectedNote.featuredAttendees || selectedNote.nextClassRecommendations || selectedNote.videoLink) && (
                <Grid size={12}> {/* CAMBIO AQUÍ: `size` prop */}
                  <Typography variant="subtitle2" mt={2}>**Extras**</Typography>
                  <Typography variant="body2">**Asistentes destacados:** {selectedNote.featuredAttendees || 'N/A'}</Typography>
                  <Typography variant="body2">**Recomendaciones para próximas clases:** {selectedNote.nextClassRecommendations || 'N/A'}</Typography>
                  <Typography variant="body2">**Link a video:** {selectedNote.videoLink ? <a href={selectedNote.videoLink} target="_blank" rel="noopener noreferrer">{selectedNote.videoLink}</a> : 'N/A'}</Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        )}

        {/* Botón para regresar al dashboard */}
        <Box textAlign="center" mt={3}>
          <Button
            variant="outlined"
            onClick={handleBackToDashboard}
            sx={outlinedButtonSx}
          >
            Regresar al Dashboard
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default ClassNotesModule;