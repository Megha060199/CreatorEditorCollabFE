
import React,{useState} from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,

} from '@mui/material';

import './Projecttable.css'; 
import { Dialog, DialogContent, } from '@mui/material';
import RequestChangePanel from '../ProjectChanges/ProjectRequestChanges'
import ProjectMedia from '../ProjectMedia/ProjectMedia'

const ProjectsTable = ({ projects }) => {


  const handleOpenReview = (projId,url, title) => {
   
    setSelectedProject({id:projId,video:url,title:title});
    setOpenReview(true);
    
  };
  const handleCloseReview = () => {
    console.log(selectedProject)
    setOpenReview(false);
    setSelectedProject(null);
  };
  const [openReview, setOpenReview] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [videoURL, setVideoURL] = useState("")

  return (
    <>
    <TableContainer component={Paper} className="projectsTableContainer">
      <Table className="customTable">
        <TableHead>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell>Editor</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {projects.length > 0 ? (
            projects.map((proj) => {
              let [id, userId, title, editor, action, workflow_status, videoUrl, projStatus] = proj;
              id = Number(id);

              // Determine which chip class to apply based on workflow_status
              let chipClass = '';
              if (workflow_status === 'Editing') {
                chipClass = 'chipEditing';
              } else if (workflow_status === 'Ready for Review') {
                chipClass = 'chipReview';
              } else {
                // Published or other
                chipClass = 'chipPublished';
              }

              return (
                <TableRow key={id}>
                  <TableCell>{title}</TableCell>
                  <TableCell>{editor}</TableCell>
                  <TableCell>
                    <Chip
                      label={workflow_status}
                      className={chipClass}
                    />
                  </TableCell>
                  <TableCell>
                    {workflow_status === 'Ready for Review' ? (
                      <Button
                        variant="text"
                        className="actionButton actionButtonMargin"
                        onClick={() => handleOpenReview(id,videoUrl,title)}
                      >
                        Approve/Request Changes
                      </Button>
                    ) : null}

                  
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No projects found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={openReview} onClose={handleCloseReview} fullWidth maxWidth="sm">
    <DialogContent>
        <ProjectMedia {...selectedProject} />
    <RequestChangePanel {...selectedProject}/>
    </DialogContent>
    
  </Dialog>
  </>
  );
};

export default ProjectsTable;
