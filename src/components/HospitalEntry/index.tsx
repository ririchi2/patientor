import React from 'react'
import { DiagnoseEntry, Entry } from '../../types'
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const HospitalEntry: React.FC<{ entry: Entry, diagnoses: DiagnoseEntry[] | undefined }> = ({ entry, diagnoses }) => {
  return (
    <Box key={entry.id} sx={{
      border: "1px solid black",
    }}>
      <Typography>
        {entry.date} - {entry.description}
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

export default HospitalEntry
