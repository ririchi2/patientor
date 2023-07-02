import React from 'react'
import { DiagnoseEntry, Entry } from '../../types'
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheck: React.FC<{ entry: Entry, diagnoses: DiagnoseEntry[] | undefined }> = ({ entry, diagnoses }) => {
  if (entry.type !== 'HealthCheck') {
    // Handle the case when entry.type is not 'HealthCheck'
    return null;
  }

  return (
    <Box key={entry.id} sx={{
      border: "1px solid black",
      borderRadius: '0.5em',
      margin: '0.5em 0em',
    }}>
      <Typography>
        {entry.date} {<MedicalServicesIcon sx={{
          width: "20px"
        }} />}
      </Typography>
      <Typography sx={{
        fontStyle: 'italic',
      }}>
        {entry.description}
      </Typography>
      <Typography>
        {entry.healthCheckRating === 0 ? <FavoriteIcon sx={{color: 'green'}} />
        : entry.healthCheckRating === 1 ? <FavoriteIcon  sx={{color: 'yellow'}}/>
        : <FavoriteIcon  sx={{color: 'red'}}/>}
      </Typography>
      <Typography>
        Diagnosed by {entry.specialist}
      </Typography>
      <List>
        {entry.diagnosisCodes?.map(code => (
          <ListItem key={code}>
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
  )
}

export default HealthCheck
