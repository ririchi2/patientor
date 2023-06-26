import React, { useEffect, useState } from 'react'
import { Patient } from '../../types'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { apiBaseUrl } from '../../constants'
import patientService from "../../services/patients";

interface Props {
  patients: Patient[]
}

const PatientPage = () => {

  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;
  // const patient = patients.find(p => p.id === id)
  // console.log(patient);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient)
    };
    void fetchPatient();
  }, []);


  return (
    <div>
      <Box>
        <Typography variant='h6'>
          {patient?.name}
        </Typography>
        <Typography>
          ssn: {patient?.ssn}
        </Typography>
        <Typography>
          occupation: {patient?.occupation}
        </Typography>
      </Box>
    </div>
  )
}

export default PatientPage
