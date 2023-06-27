import React, { useEffect, useState } from 'react'
import { Patient } from '../../types'
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { apiBaseUrl } from '../../constants'
import patientService from "../../services/patients";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
  patients: Patient[]
}

const PatientPage = () => {

  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;
  // const patient = patients.find(p => p.id === id)
  // console.log(patient);

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient)
    };
    void fetchPatient();
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
        <Typography>
          entries:
        </Typography>
        {patient?.entries.map(entry => (
          <Box>
            <Typography>
              {entry.date} {entry.description}
            </Typography>
            <List>
              {entry.diagnosisCodes?.map(code => (
                <ListItem>
                  <ListItemIcon><ArrowForwardIosIcon /></ListItemIcon>
                  <ListItemText>
                    {code}
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
