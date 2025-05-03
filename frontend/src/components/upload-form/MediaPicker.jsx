// MediaPicker.jsx
import React, { useRef } from 'react';
import { Grid, Button } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {Trans} from "react-i18next";

const MediaPicker = ({ onAddFiles }) => {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onAddFiles(files);
    // Clear input so the same file can be selected again if needed
    e.target.value = null;
  };

  const handleCameraChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onAddFiles([file]);
    }
    e.target.value = null;
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="contained"
          component="label"
          startIcon={<AttachFileIcon />}
        >
          <Trans i18nKey="gallery" />
          <input
            type="file"
            multiple
            hidden
            accept="image/*,video/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          component="label"
          startIcon={<CameraAltIcon />}
        >
          <Trans i18nKey="camera" />
          <input
            type="file"
            hidden
            accept="image/*"
            capture="environment"
            ref={cameraInputRef}
            onChange={handleCameraChange}
          />
        </Button>
      </Grid>
    </Grid>
  );
};

export default MediaPicker;
