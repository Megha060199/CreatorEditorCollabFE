import React from 'react';
import './ProjectMedia.css';
import { Typography } from '@mui/material';
import ReactPlayer from 'react-player';

const ProjectMedia = ({ id, video, title }) => {


  return (
    <div className="project-media-container">
      <Typography variant="h5" className="project-title">
        {title}
      </Typography>

      <div className="video-wrapper">
        {video ? (
          <ReactPlayer
            className="react-player"
            url={video}
            playing
            muted
            controls
          />
        ) : (
          <Typography variant="body2" color="textSecondary" className="no-video">
            No video available
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ProjectMedia;
