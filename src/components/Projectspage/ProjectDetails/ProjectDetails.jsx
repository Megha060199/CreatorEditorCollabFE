// ProjectDetails.jsx
import React from 'react';
import { Box, Button } from '@mui/material';
import ProjectMediaSection from '../ProjectMedia/ProjectMedia';
import RevisionHistory from '../ProjectRevisionHistory/RevisionHistory';
import RequestChangePanel from '../ProjectChanges/ProjectRequestChanges';
import './ProjectDetails.css'; // If you have custom CSS

const ProjectDetails = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,      
        p: 4,
        ml:4      
      }}
    >
      {/* Left Column (wider) */}
      <Box sx={{ flex: 4 }}>
        <ProjectMediaSection />

        {/* Revision History */}
       

        {/* Approve Button */}
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" className="approveButton">
            Approve video
          </Button>
        </Box>
      </Box>

      {/* Right Column (narrower) */}
      <Box sx={{ flex: 1 }}>
        <RequestChangePanel />
        <RevisionHistory />
        {/* If you have a Chat panel or other components, you can add them here. */}
      </Box>
    </Box>
  );
};

export default ProjectDetails;
