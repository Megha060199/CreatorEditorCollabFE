// RevisionHistory.jsx
import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import './RevisionHistory.css'
const revisionItems = [
  { id: 1, title: 'Draft 3', status: 'Current draft', date: '2d ago' },
  { id: 2, title: 'Draft 2', status: 'Changes requested', date: '5d ago' },
  { id: 3, title: 'Draft 1', status: 'Initial submission', date: '7d ago' },
];

const RevisionHistory = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold',textAlign:'center' }}>
        Revision history
      </Typography>

      {revisionItems.map((item, index) => (
        <Box key={item.id} sx={{ mb: index < revisionItems.length - 1 ? 3 : 0,maxWidth:'500px',margin:'0 auto' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.status}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {item.date}
            </Typography>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default RevisionHistory;
