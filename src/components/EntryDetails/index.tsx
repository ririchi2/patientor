import React from 'react'
import { DiagnoseEntry, Entry } from '../../types'
import OccupationalHealthcareEntry from '../OccupationalHealthcareEntry'
import HospitalEntry from '../HospitalEntry'
import HealthCheck from '../HealthCheck'

interface Props {
  entry: Entry,
  diagnoses: DiagnoseEntry[] | undefined
}

const EntryDetails: React.FC<Props> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnoses={diagnoses} />
    default:
      return null;
  }
}

export default EntryDetails
