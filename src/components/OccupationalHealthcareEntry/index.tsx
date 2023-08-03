import React from 'react';
import { Entry, DiagnoseEntry } from '../../types';
import { Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntry: React.FC<{ entry: Entry, diagnoses: DiagnoseEntry[] | undefined }> = ({ entry, diagnoses }) => {
  if (entry.type !== 'OccupationalHealthcare') {
    // Handle the case when entry.type is not 'OccupationalHealthcare'
    return null;
  }

  return (
    <Card variant="outlined" sx={{
      borderRadius: '0.5em',
      margin: '0.5em 0em',
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="subtitle1" sx={{ flex: 1 }}>
            {entry.date}
          </Typography>
          <WorkIcon sx={{ width: "20px", ml: 1 }} />
          <Typography variant="subtitle1" sx={{ ml: 1}}>
            {entry.employerName}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 1 }}>
          {entry.description}
        </Typography>

        <Typography variant="body1">
          Diagnosed by {entry.specialist}
        </Typography>

        {entry.diagnosisCodes && (
          <List>
            {entry.diagnosisCodes.map(code => (
              <ListItem key={code}>
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
                <ListItemText>
                  {code}{' '}
                  {diagnoses?.find(diagnose => diagnose.code === code)?.name || ''}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcareEntry;
