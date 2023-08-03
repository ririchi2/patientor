import React, { useEffect, useState } from 'react';
import { DiagnoseEntry, EntryFormValues, Patient } from '../../types';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnoses';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from '../EntryDetails';
import AddEntryModal from '../AddEntryModal';
import axios from 'axios';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<DiagnoseEntry[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!patient || !patient.id) {
      console.error("Patient ID is missing");
      return;
    }
    try {
      const entry = await patientService.createEntry(patient?.id, values)
      setModalOpen(false);
      setPatient({ ...patient, entries: [...patient.entries, entry]})
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" gutterBottom>
          Entries:
        </Typography>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </Box>
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
