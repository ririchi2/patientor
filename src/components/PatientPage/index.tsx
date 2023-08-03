import React, { useEffect, useState } from 'react';
import { DiagnoseEntry, Patient } from '../../types';
import { Box, Typography, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnoses';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from '../EntryDetails';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<DiagnoseEntry[]>();

  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };
    void fetchPatient();

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h4" component="h1" gutterBottom>
        {patient?.name} {patient?.gender === 'male' ? <MaleIcon fontSize="inherit" /> : <FemaleIcon fontSize="inherit" />}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>SSN:</strong> {patient?.ssn}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Occupation:</strong> {patient?.occupation}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Entries:
      </Typography>
      <Grid container spacing={2}>
        {patient?.entries.map(entry => (
          <Grid key={entry.id} item xs={12}>
            <EntryDetails entry={entry} diagnoses={diagnoses} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PatientPage;
