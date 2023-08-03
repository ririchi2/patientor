import React from 'react';
import { Entry, DiagnoseEntry } from '../../types';
import { Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { green, yellow, red } from '@mui/material/colors';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheck: React.FC<{ entry: Entry, diagnoses: DiagnoseEntry[] | undefined }> = ({ entry, diagnoses }) => {
  if (entry.type !== 'HealthCheck') {
    // Handle the case when entry.type is not 'HealthCheck'
    return null;
  }

  const getHealthCheckRatingColor = (rating: number) => {
    switch (rating) {
      case 0:
        return green[500];
      case 1:
        return yellow[500];
      case 2:
      case 3:
        return red[500];
      default:
        return 'inherit';
    }
  };

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
          <MedicalServicesIcon sx={{ width: "20px", ml: 1 }} />
        </Box>

        <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 1 }}>
          {entry.description}
        </Typography>

        <Box display="flex" alignItems="center" mb={1}>
          <FavoriteIcon sx={{ color: getHealthCheckRatingColor(entry.healthCheckRating), mr: 1 }} />
          <Typography variant="body1" color="textSecondary">
            Health Check Rating: {entry.healthCheckRating}
          </Typography>
        </Box>

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

export default HealthCheck;
