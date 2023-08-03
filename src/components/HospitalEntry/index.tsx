import React from 'react';
import { Entry, DiagnoseEntry } from '../../types';
import { Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HospitalEntry: React.FC<{ entry: Entry, diagnoses: DiagnoseEntry[] | undefined }> = ({ entry, diagnoses }) => {
  return (
    <Card variant="outlined" sx={{
      borderRadius: '0.5em',
      margin: '0.5em 0em',
    }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          {entry.date} - {entry.description}
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

export default HospitalEntry;
