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

import { EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [type, setType] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const arrDiagnosisCodes = diagnosisCodes.split('\n');
    const ratingValue = parseInt(healthCheckRating, 10) as HealthCheckRating;
    onSubmit({
      description,
      date,
      specialist,
      healthCheckRating: ratingValue,
      type,
      diagnosisCodes: arrDiagnosisCodes,
    });
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
            label="HealthCheck rating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
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
            <Select value={type} onChange={(e) => setType(e.target.value as EntryType)}>
              {entryTypes.map((entryType) => (
                <MenuItem key={entryType} value={entryType}>
                  {entryType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
