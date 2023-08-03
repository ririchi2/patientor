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

import { PatientFormValues, Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

interface GenderOption {
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
  value: v, label: v.toString()
}));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [ssn, setSsn] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(Gender.Other);

  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find(g => g.toString() === value);
      if (gender) {
        setGender(gender);
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender
    });
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Add New Patient
      </Typography>
      <form onSubmit={addPatient}>
        <Box mt={2}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Social security number"
            fullWidth
            value={ssn}
            onChange={({ target }) => setSsn(target.value)}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Date of birth"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={dateOfBirth}
            onChange={({ target }) => setDateOfBirth(target.value)}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Occupation"
            fullWidth
            value={occupation}
            onChange={({ target }) => setOccupation(target.value)}
          />
        </Box>
        <Box mt={2}>
          <FormControl fullWidth>
            <InputLabel shrink>Gender</InputLabel>
            <Select value={gender} onChange={onGenderChange} label="Gender">
              {genderOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
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

export default AddPatientForm;
