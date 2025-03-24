// src/components/RequestChangePanel.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import usePost from '../../../hooks/usePost';
import './ProjectRequestChanges.css';

const RequestChangePanel = ({ id, video, title }) => {
  const [section, setSection] = useState('');
  const [notes, setNotes] = useState('');
  const [videoId, setVideoId] = useState(null);

  const { data, loading, error, post: uploadVideo } = usePost('/video/uploadYoutube');

  const handleApprove = async () => {
    if (!video) return;
    try {
      const result = await uploadVideo({
        url: video,
        title: 'Approved Video',
        description: "Test Video",
        privacyStatus: 'private',
      });
      setVideoId(result.id ?? result.videoId);
      console.log(result.videoId)
    } catch(err) {
      console.log(err)

    }
  };

  return (
    <Box className="requestChangePanel">
      <Typography variant="subtitle1" className="requestChangeTitle">
        Request a change
      </Typography>

      <FormControl fullWidth className="requestFormControl">
        <InputLabel>Choose a section</InputLabel>
        <Select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          label="Choose a section"
          IconComponent={KeyboardArrowDownIcon}
        >
          <MenuItem value="Intro">Intro</MenuItem>
          <MenuItem value="Middle">Middle</MenuItem>
          <MenuItem value="Ending">Ending</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Explain the change"
        multiline
        rows={3}
        fullWidth
        className="requestTextField"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <Box className="buttonContainer">
        <Button variant="contained" className="requestButton">
          Request change
        </Button>

        <Button
          variant="contained"
          color="primary"
          className="approve"
          onClick={handleApprove}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : 'Approve Video'}
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error.message || 'Upload failed'}
        </Typography>
      )}

      {videoId && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          ✅ Uploaded! Watch at{' '}
          <a href={`https://youtu.be/${videoId}`} target="_blank" rel="noopener noreferrer">
            https://youtu.be/{videoId}
          </a>
        </Typography>
      )}
    </Box>
  );
};

export default RequestChangePanel;
