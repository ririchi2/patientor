import { useState, SyntheticEvent } from "react";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  SelectChangeEvent,
} from '@mui/material';

import { Entry, EntryFormValues, EntryType, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const entryTypes: EntryType[] = ["Hospital", "OccupationalHealthcare", "HealthCheck"]

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [type, setType] = useState<EntryType>('Hospital');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const arrDiagnosisCodes = diagnosisCodes.split('\n');
    const entry: EntryFormValues = {
      description,
      date,
      specialist,
      diagnosisCodes: arrDiagnosisCodes,
      type
    };
    switch (type) {
      case "HealthCheck":
        entry.healthCheckRating = parseInt(healthCheckRating, 10) as HealthCheckRating;
        break;
      case "Hospital":
        entry.discharge = {
          date: dischargeDate,
          criteria: dischargeCriteria,
        };
        break;
      case "OccupationalHealthcare":
        entry.employerName = employerName;
        // entry.sickLeave = {
        //   startDate: "",
        //   endDate: "",
        // };
        break;
      default:
        break;
    }
    console.log(entry)
    onSubmit(entry);
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        New Entry
      </Typography>
      <form onSubmit={addEntry}>
        <Box mt={2}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Diagnosis codes"
            multiline
            maxRows="4"
            fullWidth
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
          />
        </Box>
        <Box mt={2}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value as EntryType)} label="Type">
              {entryTypes.map((entryType) => (
                <MenuItem key={entryType} value={entryType}>
                  {entryType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {
          type === "HealthCheck" ?
            <Box mt={2}>
              <TextField
                label="HealthCheck rating"
                fullWidth
                value={healthCheckRating}
                onChange={({ target }) => setHealthCheckRating(target.value)}
              />
            </Box> : null
        }
        {
          type === "Hospital" && (
            <>
              <Box mt={2}>
                <TextField
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  fullWidth
                  value={dischargeDate} // Add discharge date value here
                  onChange={({ target }) => setDischargeDate(target.value)} // Add discharge date change handler here
                />
              </Box>
              <Box mt={2}>
                <TextField
                  label="Discharge Criteria"
                  fullWidth
                  value={dischargeCriteria} // Add discharge criteria value here
                  onChange={({ target }) => setDischargeCriteria(target.value)} // Add discharge criteria change handler here
                />
              </Box>
            </>
          )
        }
        {
          type === "OccupationalHealthcare" && (
            <>
              <Box mt={2}>
                <TextField
                  label="Employer Name"
                  fullWidth
                  value={employerName} // Add employer name value here
                  onChange={({ target }) => setEmployerName(target.value)} // Add employer name change handler here
                />
              </Box>
              {/* <Box mt={2}>
                <TextField
                  label="Sick Leave Start Date"
                  placeholder="YYYY-MM-DD"
                  fullWidth
                  value={""} // Add sick leave start date value here
                  onChange={({ target }) => { }} // Add sick leave start date change handler here
                />
              </Box>
              <Box mt={2}>
                <TextField
                  label="Sick Leave End Date"
                  placeholder="YYYY-MM-DD"
                  fullWidth
                  value={""} // Add sick leave end date value here
                  onChange={({ target }) => { }} // Add sick leave end date change handler here
                />
              </Box> */}
            </>
          )
        }
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button color="secondary" variant="contained" fullWidth onClick={onCancel}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default AddEntryForm;
