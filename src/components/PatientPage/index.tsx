import React, { useEffect, useState } from 'react'
import { DiagnoseEntry, Patient } from '../../types'
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { apiBaseUrl } from '../../constants'
import patientService from "../../services/patients";
import diagnoseService from '../../services/diagnoses'
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const PatientPage = () => {

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<DiagnoseEntry[]>();

  const id = useParams().id;
  // const patient = patients.find(p => p.id === id)
  // console.log(patient);

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient)
    };
    void fetchPatient();
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses)
    };
    void fetchDiagnoses();
  }, []);


  return (
    <div>
      <Box>
        <Typography variant='h4'>
          {patient?.name} {patient?.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
        </Typography>
        <Typography>
          ssn: {patient?.ssn}
        </Typography>
        <Typography>
          occupation: {patient?.occupation}
        </Typography>
        <Typography variant='h5'>
          entries:
        </Typography>
        {patient?.entries.map(entry => (
          <Box>
            <Typography>
              {entry.date} - {entry.description}
            </Typography>
            <List>
              {entry.diagnosisCodes?.map(code => (
                <ListItem>
                  <ListItemIcon><ArrowForwardIosIcon /></ListItemIcon>
                  <ListItemText>
                    {code}
                  </ListItemText>
                  <ListItemText>
                  {diagnoses?.filter(diagnose => diagnose.code === code ? diagnose.name : '').map(diagnose => diagnose.name)}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </div>
  )
}

export default PatientPage
